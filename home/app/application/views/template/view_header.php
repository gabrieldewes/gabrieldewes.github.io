<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Home</title>

	<meta name="keywords" content="">
	<meta name="description" content="Faça login ou cadastre-se.">
	<meta name="author" content="Gabriel Dewes">

	<link href="<?php echo base_url('assets/css/bootstrap.css');?>" rel="stylesheet">
	<link href="<?php echo base_url('assets/css/bootstrap.min.css');?>" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" ></script>
	<script src="<?php echo base_url('assets/js/bootstrap.min.js'); ?>" ></script>
</head>
	<body>
		<nav class="navbar navbar-collapse navbar-static-top">
			<a class="btn-lg btn-group" href="<?php echo site_url('home'); ?>" >Home</a>

			<?php if (isset($user['username']) && ($user['username'] != '')) { ?>
				
				<div class="dropdown btn-group pull-right">
					<button class="btn btn-default dropdown-toggle" type="button" id="menu" data-toggle="dropdown">
						<?php echo $user['username']; ?>
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu" role="menu" aria-labelledby="menu">
						<li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo site_url('admin'); ?>">Perfil</a></li>
						<li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo site_url(''); ?>">Configurações</a></li>
						<li role="presentation" class="divider"></li>
						<li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo site_url('logout'); ?>">Sair</a></li>
					</ul>
				</div>
			<?php } ?>
		</nav>
	<div class="container">
