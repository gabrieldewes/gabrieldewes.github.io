<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	// Dados passados para a view, podemos setar valores no __construct
	// e passar para outras funções se preciso;
	var $data = array(); 
	
    function __construct() {
        parent::__construct();
		$this->load->model('model_user');
		$this->load->library('form_validation');
    }

	// ROTA /login
	public function index()
	{
		if ($this->model_user->is_logged_in()) { redirect('admin'); }
		/* Se o usuario tem passe, redireciona para a home admin */
		/* redirect('package') Faz um "redirecionamento de cabeçalho" para o URI especificado. */
	
		$this->form_validation->set_rules('username', 'usuário', 'required');
		$this->form_validation->set_rules('password', 'senha', 'required');
		
		if ($this->form_validation->run()) {
			$username = $this->input->post('username');
			$password = $this->input->post('password');
		
			/* Busca um usuário pelo método get_by_username que retorna um array com os dados do usuário */		
			if ($user = $this->model_user->get_by_username($username)) 
			{
				/* Compara a senha do campo com a HASHED respectiva, retorna TRUE ou FALSE */
				if ($this->model_user->check_password( $password, $user['password'] )) 
				{
					/* Atualiza os dados da sessão */
					$this->model_user->allow_pass($user);
					redirect('admin');
					
				} 
				else { $this->data['login_error'] = 'Senha incorreta.'; }
			} 
			else { $this->data['login_error'] = 'Usuário não encontrado.'; }
		}
		$this->load->view('login/v_login', $this->data);
	}
	
	// ROTA /register
	public function register() {
		if ($this->model_user->is_logged_in()) { redirect('admin'); }

		$this->form_validation->set_rules('fullname', 'nome', 'required');
		$this->form_validation->set_rules('username', 'usuário', 'required|is_unique[users.username]');
		$this->form_validation->set_rules('email', 'e-mail', 'required|valid_email|is_unique[users.email]');
		$this->form_validation->set_rules('password', 'senha', 'required');
		$this->form_validation->set_rules('cpassword', 'confirmação de senha', 'required|matches[password]');
		
		if ($this->form_validation->run()) {
			$user = array(
				'username' => $this->input->post('username'),
				'email' => $this->input->post('email'),
				'fullname' => $this->input->post('fullname'),
				'password' => $this->model_user->hash_password( $this->input->post('password') )
			);
			if ($this->model_user->save($user)) {
				$this->data['register_success'] = 'Cadastro completo. <a href="'.site_url('login').'">Faça login</a>.';
			} 
			else { $this->data['register_error'] = 'Ocorreu algum erro. Tente novamente mais tarde.'; }
		}
		$this->load->view('login/v_register', $this->data);
	}

	public function update_password() {

		$this->form_validation->set_rules('password', 'senha atual', 'required');
		$this->form_validation->set_rules('new_password', 'nova senha', 'required');
		$this->form_validation->set_rules('cnew_password', 'confirmação de nova senha', 'required|matches[new_password]');

		if($this->form_validation->run()) 
		{
			$user = $this->session->userdata('user');
			if ($this->model_user->check_password($this->input->post('password'), $user['password']) ) 
			{
				$password = array(
					'password' => $this->model_user->hash_password($this->input->post('new_password') ));
			
				if($this->model_user->update($password)) 
				{
					$this->data['update_success'] = 'Senha alterada com êxito. <a href="'.site_url('admin').'">Voltar ao seu perfil</a>';
				}
				else { $this->data['update_error'] = 'Ocorreu algum erro. Tente novamente mais tarde.'; }
			} 
			else { $this->data['update_error'] = 'Senha atual incorreta.'; }
		}
		$this->load->view('login/v_update', $this->data);
	}
	
	// ROTA /logout
	public function logout() {
		//$this->model_user->remove_pass();
		session_destroy();
		$this->data['login_success'] = 'Você foi desconectado. Volte logo!';
		$this->load->view('login/v_login', $this->data);
	}
	
	/* Mensagem de inatividade */
	public function noaccess() {
		$this->data['login_error'] = 'Você ficou muito tempo inativo. Entre novamente.';
		$this->load->view('login/v_login', $this->data);
	}
}

/* End of file login.php */
/* Location: ./application/controllers/login.php */