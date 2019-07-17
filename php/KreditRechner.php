<?php
session_start ();

// echo 'hallo : tJamContacts <br>';
header ( 'Content-type: application/json' );
date_default_timezone_set ( 'Europe/Berlin' );


$chkin = "1";

$kredit = 10000;
$zins = 3;
$laufz = 12;

if(!$kredit) {
	echo "Bitte die H&ouml;he des Kredits angeben<br />";
	unset($chkin);
}
if(!$zins) {
	echo "Bitte den Zinssatz des Kredits angeben<br />";
	unset($chkin);
}
if(!$laufz) {
	echo "Bitte die Laufzeit des Kredits angeben<br />";
	unset($chkin);
}

if(isset($chkin)) {
	$count = (int)$laufz;
	$calcterm = "";
	for ($count; $count > 0; $count--) {
		$calcterm .= "*(1+".$zins.")";
	}
	$formel='$ergebnis='.$kredit.$calcterm.';';
	//echo $formel;
	eval($formel);
	echo $ergebnis;
}

?>
<br />
<form action='./index.php' method='post'>
Kredithöhe:&nbsp;<input name='kredit' type='text' size='12' maxlength='1500'>
Zinssatz:&nbsp;<input name='zins' type='text' size='20' maxlength='1500'>
Laufzeit in ganzjahren:<input name='laufz' type='text' size='20' maxlength='1500'>
<input type= 'submit' value='berechnen'>
</form>

