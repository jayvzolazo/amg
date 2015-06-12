<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mod_members extends CI_Model {
    var $members = 'members';
    
    function _get($data = NULL) {
        $result = $this->db->get($this->members);
        
        if (!is_null($data)) {
            $result = $this->db->get_where($this->members, $data);
            
            if ($result->num_rows() > 0) {
                $token = "AMG".$this->encrypt->sha1(md5("{$result->row()->username}:{$result->row()->password}"));
                
                $this->session->set_userdata(array(
                    'user' => $result->row()->mid,
                    'username' => $result->row()->username,
                    'token' => $token
                ));
                
                return $this->session->all_userdata();
            }
            else {
                return false;
            }
        }
        
        return $result->result();
    }
}