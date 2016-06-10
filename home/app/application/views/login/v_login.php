<?php
  $username_error = (trim(form_error('username')) != '' ) ? ' error' : '';
  $password_error = (trim(form_error('password')) != '' ) ? ' error' : '';
?>

<?php $this->load->view('template/view_header.php'); ?>

<div class="body">
  <div class="container">
    <form class="form" method="post" action="<?php echo site_url('login'); ?>">
  <legend>Faça login</legend>

  <?php echo (isset($login_success)) ? "<div class=\"alert alert-success\"><strong>$login_success</strong><a class=\"close\" data-dismiss=\"alert\">×</a></div>" : ''; ?>
  <?php echo (isset($login_error)) ? "<div class=\"alert alert-error\"><strong>$login_error</strong><a class=\"close\" data-dismiss=\"alert\">×</a></div>" : ''; ?>

    <div class="control-group<?php echo $username_error?>">
      <label class="control-label" for="username">Usuário</label>
      <div class="controls">
        <input type="text" class="input-xlarge" id="username" name="username" value="<?php echo set_value('username'); ?>">
          <?php echo form_error('username', '<p>', '</p>'); ?>
      </div>
    </div>

    <div class="control-group<?php echo $password_error?>">
      <label class="control-label" for="password">Senha</label>
        <div class="controls">
          <input type="password" id="password" name="password" value="<?php echo set_value('password'); ?>">
          <?php echo form_error('password', '<p>', '</p>'); ?>
        </div>
    </div>  

    <div class="control-group">
      <label class="control-label" for="login"> </label>
        <div class="controls">
          <input type="submit" value="Login">
          <a href="<?php echo site_url('register'); ?>"> ou registre-se</a>
        </div>
    </div>    
  </form>
  </div>
</div>

<?php $this->load->view('template/view_footer.php'); ?>		

