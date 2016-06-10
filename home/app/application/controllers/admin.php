<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {
	var $data = array();

    function __construct(){
        parent::__construct();

		$this->load->model('model_user');
		
		if ($this->model_user->is_logged_in() === FALSE) {
			$this->model_user->remove_pass();
			redirect('login/noaccess');
		} 
		else {
			$this->data['user'] = $this->session->userdata('user');
		}

    }

	public function index()
	{
		$this->load->view('admin/view_admin_home', $this->data);

	}
	

}

/* End of file admin.php */
/* Location: ./application/controllers/admin.php */