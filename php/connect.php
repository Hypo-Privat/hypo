<?php
session_start();

// echo 'hallo : tJamContacts <br>';
header('content-type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Berlin');

$timestamp = time();
$datum = date("Y-m-d", $timestamp);
$uhrzeit = date("H:i:s", $timestamp);
echo $datum, " - ", $uhrzeit, " Uhr <br>";

$db = mysqli_connect("server11.xxx.ch", "hypo_usr", "Txx", "hypo");

if (mysqli_connect_errno()) {
    printf("Verbindung fehlgeschlagen: %s", mysqli_connect_error());
    exit();
} else {
    echo ("Verbindung erfolgreich: %s");
}

// http://www.schnatterente.net/webdesign/php-mysql-utf8
mysqli_query($db, "SET NAMES 'utf8'");

?>
