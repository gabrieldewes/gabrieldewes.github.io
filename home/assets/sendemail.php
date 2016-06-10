<?php require "config.ini"; ?>
<?php

ini_set ("SMTP","smtp.eb.mil.br");

$name=$_POST["name"];
$email=$_POST["email"];
$mensagem=$_POST["mensagem"];

mail ("$emaildest","Contato do Site","Nome: $name\n E-mail: $email\n Mensagem: $mensagem\n\n\n ","From: $name<$email>");
?>
