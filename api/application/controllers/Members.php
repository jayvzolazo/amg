<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Members extends CI_Controller {
    
    function __construct() {
        parent::__construct();
        
        $this->load->model('mod_members');
    }
    
    function login() {
        $this->output->set_header("HTTP/1.0 200 OK");
        $this->output->set_content_type('application/json');
        
        $data = array('greet' => 'hello api');
        
        $reqMethod = $this->input->server('REQUEST_METHOD');
        
        switch ($reqMethod) {
            case 'GET' :
                $this->output->set_output(json_encode($data));
                break;
            case 'POST' :
                $rawData = json_decode(file_get_contents('php://input'));
                
                $data = array(
                    'username' => $rawData->username,
                    'password' => $this->encrypt->sha1(md5($rawData->password))
                );
                
                $member = $this->mod_members->_get($data);
                $this->output->set_output(json_encode($member));
                break;
            default:
                $this->output->set_header("HTTP/1.0 405 Method Not Allowed");
                break;
        }
    }
    
    function logout() {
        $this->session->sess_destroy();
    }
}