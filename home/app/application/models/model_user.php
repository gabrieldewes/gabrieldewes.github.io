<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*
	Nesta classe eu deixei o CRUD básico mais
*/

class Model_user extends CI_Model {

	var $table = 'users'; // Tabela do banco
	var $max_idle_time = 300; // Tempo máximo de inatividade - 300s = 5 minutos

    function __construct(){
        parent::__construct();
    }
    
	// Salva um usuário, retorna o insert_id() ou FALSE
	function save($user_data) {
		$this->db->insert($this->table , $user_data); 

		if (!is_null($this->db->insert_id()))
			return $this->db->insert_id();

		return false;
	}
	
	/* Altera dados de usuário já existente, basta passar um array com os dados. */
	function update($user_data) {
		$user = $this->session->userdata('user');
		$id = $user['id'];

		if (isset($user_data)) {
			$this->db->where('id', $id);
			$this->db->update($this->table, $user_data); 
			return $this->db->affected_rows();
		}
		return false;
	}
	
	/* Pega os dados de um usuário pelo username */
	function get_by_username($username) {
		$user = array('username' => $username);
		$query = $this->db->get_where($this->table, $user, 1);
		if ($query->num_rows() > 0) 
			return $query->row_array();
		return false;
	}

	/* Pega os dados de um usuário pelo id */
	function get_by_id($id) {
		$id = array('id' => $id);
		$query = $this->db->get_where($this->table, $id, 1);
		if( $query->num_rows() > 0 ) return $query->row_array();
		return false;
	}
	
	/* Verifica se o usuário está logado e atualiza dados da sessão */
	function is_logged_in() {
		$last_activity = $this->session->userdata('last_activity');
		$logged_in = $this->session->userdata('logged_in');
		$user = $this->session->userdata('user');
		
		if ( ($logged_in == TRUE) 
		&& ( (time() - $last_activity) < $this->max_idle_time) ) {
			$this->allow_pass($user);
			return true;
		} 
		else {
			//$this->remove_pass();
			return false;
		}
	}

	/* Adiciona os dados do usuário para a sessão atual */
	function allow_pass($user_data) {
		$this->session->set_userdata(array('last_activity' => time(), 'logged_in' => TRUE, 'user' => $user_data));
	}
	
	/* Limpa os dados da sessão (Acho que é inútil e substituivel por session_destroy(); ) */
	function remove_pass() {
		$array_items = array('last_activity' => '', 'logged_in' => '', 'user' => '');
		$this->session->set_userdata($array_items);
	}
	
	
	/* Verifica se o e-mail já existe */
	function email_exists($email) {
		$query = $this->db->get_where($this->table, array('email' => $email), 1);
		if( $query->num_rows() > 0 ) return true;
		return false;
	}
	
	/* Verifica se o username já existe */
	function username_exists($username) {
		$query = $this->db->get_where($this->table, array('username' => $username), 1);
		if( $query->num_rows() > 0 ) return true;
		return false;
	}

	
	
	/* Verifica se o password coincide com o respectivo hash */
	function check_password($password, $hashed_password) {
		list($salt, $hash) = explode('.', $hashed_password);
		$hashed2 = $salt.'.'.md5($salt.$password);
		return ($hashed_password == $hashed2);
	}

	/* Gera um salt e concatena com o hash da senha. */
	function hash_password($password) {
		$salt = $this->generate_salt();
		return $salt.'.'.md5($salt.$password);
	}
	
	/* Gera um SALT para concatenar ao HASH */
	// Como somente um md5($pass) fica vulnerável a ataques Rainbow Tables, 
	// Geramos um Salt dinâmico para concatenar ao Hash da senha.
	private function generate_salt() {
        $characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $length = 10;
        $i = 0;
        $salt = "";
        while ($i < $length) {
            $salt .= $characters{mt_rand(0, (strlen($characters) - 1))};
            $i++;
        }
        return $salt;
	}
	
}

/* End of file model_user.php */
/* Location: ./application/models/model_user.php */