<?php

$servername = "sh-exp-dev-mysql.inhomecountry.com";
$username = "ryaninhomecountr";
$password = "qwerty";
$dbname = "sh_exp_dev";

$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

?>