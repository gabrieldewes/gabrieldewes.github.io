<?php 
	$password_error = (trim(form_error('password')) != '' ) ? ' error' : ''; 
	$new_password_error = (trim(form_error('new_password')) != '' ) ? ' error' : '';
	$cnew_password_error = (trim(form_error('cnew_password')) != '') ? ' error' : '';
?>

<?php $this->load->view('template/view_header.php'); ?>

<div class="container">
  	<form class="form" method="post" action="<?php echo site_url('update'); ?>" >
  	<legend>Altere sua senha</legend>

  	<?php echo (isset($update_error)) ? "<div class=\"alert alert-error\"><strong>$update_error</strong></div>" : ''; ?>
  	<?php echo (isset($update_success)) ? "<div class=\"alert alert-success\"><strong>$update_success</strong></div>" : ''; ?>

  		<?php if (!isset($update_success)) { ?>

  		<div class="control-group<?php echo $password_error?>">
	      <label class="control-label" for="password">Senha atual</label>
	        <div class="controls">
	          <input type="password" id="password" name="password" value="<?php echo set_value('password'); ?>">
	          <?php echo form_error('password', '<p>', '</p>'); ?>
	        </div>
	    </div>

	    <div class="control-group<?php echo $password_error?>">
	      <label class="control-label" for="new_password">Nova senha</label>
	        <div class="controls">
	          <input type="password" id="new_password" name="new_password" value="<?php echo set_value('new_password'); ?>">
	          <?php echo form_error('new_password', '<p>', '</p>'); ?>
	        </div>
	    </div> 

	    <div class="control-group<?php echo $password_error?>">
	      <label class="control-label" for="cnew_password">Confirme a nova senha</label>
	        <div class="controls">
	          <input type="password" id="cnew_password" name="cnew_password" value="<?php echo set_value('cnew_password'); ?>">
	          <?php echo form_error('cnew_password', '<p>', '</p>'); ?>
	        </div>
	    </div> 

	    <div class="contro-group">
	    	<label class="control-label" for="update">
	    		<div class="controls">
	    			<input type="submit" value="Alterar"></input>
	    		</div>
	    	</label>
	    </div>

  	<?php } ?>
  	</form>
</div>

<?php $this->load->view('template/view_footer.php'); ?>		


