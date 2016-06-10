<?php $this->load->view('template/view_header.php'); ?>

<div>
	<p>Bem-vindo <?php echo $user['fullname']?>. </p>

	<?php $this->load->view('admin/view_admin_sidebar'); ?>

	<p class=""><a href="<?php echo site_url('logout'); ?>" >Clique aqui para sair.</a></p>
</div>
				
<?php $this->load->view('template/view_footer.php'); ?>
