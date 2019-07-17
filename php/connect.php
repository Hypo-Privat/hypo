<?php
session_start();

// echo 'hallo : tJamContacts <br>';
header('content-type: application/json; charset=utf-8');
date_default_timezone_set('Europe/Berlin');

$timestamp = time();
$datum = date("Y-m-d", $timestamp);
$uhrzeit = date("H:i:s", $timestamp);
echo $datum, " - ", $uhrzeit, " Uhr <br>";

$db = mysqli_connect("server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo");
// $db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
// $db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
if (mysqli_connect_errno()) {
    printf("Verbindung fehlgeschlagen: %s", mysqli_connect_error());
    exit();
} else {
    echo ("Verbindung erfolgreich: %s");
}

// http://www.schnatterente.net/webdesign/php-mysql-utf8
mysqli_query($db, "SET NAMES 'utf8'");

?>