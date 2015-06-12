<?php header('Content-type: text/plain');

require_once 'config/database.php';

$dbClass = new Database();
$dbConfig = $dbClass->_config();

$reqMethod = strtolower($_SERVER['REQUEST_METHOD']);

switch($reqMethod){
    case 'get' :
        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $chapterId = $_GET['id'];
            
            getChapters($dbConfig, $chapterId);
        }
        else {
            getMembers($dbConfig);
        }
        
        break;
    case 'post' :
        $data = json_decode(file_get_contents('php://input'));
        
        addChapter($dbConfig, $data);
        break;
    default :
        echo 'invalid request';
        break;
}

function getChapters($dbh, $chapterId = NULL) {
    try {
        $results = array();
        
        if (!is_null($chapterId)) {
            $sql = $dbh->prepare('SELECT * FROM chapters WHERE chapterId = :id');
            
            $sql->bindParam(':id', $chapterId);
            $sql->execute();

            $results['chapter'] = $sql->fetch(PDO::FETCH_ASSOC);
            $results['members'] = getMembers($dbh, $chapterId);
            
            
        }
        else {
            foreach($dbh->query('SELECT * FROM chapters',PDO::FETCH_ASSOC) as $row) {
                $results[] = $row;
            }
        }
        
        echo json_encode($results);
        //print_r($results);
        $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}

function getMembers($dbh, $chapterId = NULL){
    try {
        $results = '';
        
        if (!is_null($chapterId)) {
            foreach($dbh->query("SELECT * FROM profile WHERE chapterId = {$chapterId}",PDO::FETCH_ASSOC) as $row) {
                $results[] = $row;
            }
            
            return $results;
        }
        else {
            $fields = array(
                "CONCAT_WS(' ', firstName, middleName, lastName) AS 'name'",
                "c.name AS 'chapterName'",
                "p.pseudoNim",
                "p.gender",
            );
            $sql = "SELECT ".implode(",", $fields)." FROM profile AS p ";
            $sql.= "LEFT JOIN chapters AS c ON p.chapterId = c.chapterId";
            foreach($dbh->query($sql,PDO::FETCH_ASSOC) as $row) {
                $results[] = $row;
            }
        }
        
        echo json_encode($results);
        
        $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}

function addChapter($dbh, $data) {
    try {
        // to be modified later
        $sql = "INSERT INTO chapters(name, createdOn) VALUES(:name,:createdOn)";
        $exec = $dbh->prepare($sql);
        $exec->execute(array(
                ':name' => $data->name,
                ':createdOn' => $data->createdOn
            )
        );
        
        $dbh = null;
    } catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
}