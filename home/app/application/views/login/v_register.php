<?php
	 $username_error = (trim(form_error('username')) != '' ) ? ' error' : '';
	 $password_error = (trim(form_error('password')) != '' ) ? ' error' : '';
	 $email_error = (trim(form_error('email')) != '' ) ? ' error' : '';
	 $cpassword_error = (trim(form_error('cpassword')) != '' ) ? ' error' : '';
	 $fullname_error = (trim(form_error('fullname')) != '' ) ? ' error' : '';
?>

<?php $this->load->view('template/view_header.php'); ?>

<div class="container">
  <form class="form" method="post" action="<?php echo site_url('register'); ?>">
      <legend>Registre-se</legend>
  			
  	<?php echo (isset($register_error)) ? "<div class=\"alert alert-error\"><strong>$register_error</strong><a class=\"close\" data-dismiss=\"alert\">×</a></div>" : ''; ?>
  	<?php echo (isset($register_success)) ? "<div class=\"alert alert-success\"><strong>$register_success</strong><a class=\"close\" data-dismiss=\"alert\">×</a></div>" : ''; ?>
      
  	<?php if (!isset($register_success)) { ?>
  	
      <div class="control-group<?php echo $fullname_error; ?>">
        <label class="control-label" for="fullname">Nome completo</label>
        <div class="controls">
          <input type="text" id="fullname" name="fullname" value="<?php echo set_value('fullname'); ?>">
  		    <?php echo form_error('fullname', '<p class="help-inline">', '</p>'); ?>
        </div>
      </div>

      <div class="control-group<?php echo $email_error; ?>">
        <label class="control-label" for="email">Seu e-mail</label>
        <div class="controls">
          <input type="text" id="email" name="email" value="<?php echo set_value('email'); ?>">
  		    <?php echo form_error('email', '<p class="help-inline">', '</p>'); ?>
        </div>
      </div>
      
      <div class="control-group<?php echo $username_error; ?>">
        <label class="control-label" for="username">Nome de Usuário</label>
        <div class="controls">
          <input type="text" class="input-xlarge" id="username" name="username" value="<?php echo set_value('username'); ?>">
  		    <?php echo form_error('username', '<p class="help-inline">', '</p>'); ?>
        </div>
      </div>
      <div class="control-group<?php echo $password_error; ?>">
        <label class="control-label" for="password">Senha</label>
        <div class="controls">
          <input type="password" class="input-xlarge" id="password" name="password" value="<?php echo set_value('password'); ?>">
  		    <?php echo form_error('password', '<p class="help-inline">', '</p>'); ?>
        </div>
    	</div>

      <div class="control-group<?php echo $cpassword_error; ?>">
        <label class="control-label" for="cpassword">Confirme sua senha</label>
        <div class="controls">
          <input type="password" class="input-xlarge" id="cpassword" name="cpassword" value="<?php echo set_value('cpassword'); ?>">
    		  <?php echo form_error('cpassword', '<p class="help-inline">', '</p>'); ?>
        </div>    
    	</div>	
      <div class="control-group">
        <label class="control-label" for="register"></label>
        <div class="controls">
      		<input type="submit" value="Registre-se" class="">
          <a href="<?php echo site_url('login'); ?>">ou faça login</a>
        </div>
      </div>

  		<?php } ?>

  </form>
</div>
					
<?php $this->load->view('template/view_footer.php'); ?>

