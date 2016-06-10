<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	var $data = array();

    function __construct(){
        parent::__construct();	

        $this->load->model('model_user');

        if ($this->model_user->is_logged_in()) {
       		$this->data['user'] = $this->session->userdata('user');
    	}

    }

	public function index()
	{
		$this->load->view('template/view_header', $this->data);
		$this->load->view('template/view_sidebar');
		$this->load->view('template/view_footer');
	}
	
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */