<?php
// session_start();

// echo 'hallo : tJamContacts <br>';

header('Content-type: application/json');
date_default_timezone_set ( 'Europe/Berlin' );

// code aus http://www.selfphp.de/code_snippets/code_snippet.php?id=78
function generatePassword($passwordlength = 8, $numNonAlpha = 0, $numNumberChars = 0, $useCapitalLetter = false) {
	$numberChars = '123456789';
	$specialChars = '!$=?*-:;.,+~@_';
	$secureChars = 'abcdefghkmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$stack = '';
	
	// Stack f�r Password-Erzeugung f�llen
	$stack = $secureChars;
	
	if ($useCapitalLetter == true)
		$stack .= strtoupper ( $secureChars );
	
	$count = $passwordlength - $numNonAlpha - $numNumberChars;
	$temp = str_shuffle ( $stack );
	$stack = substr ( $temp, 0, $count );
	
	if ($numNonAlpha > 0) {
		$temp = str_shuffle ( $specialChars );
		$stack .= substr ( $temp, 0, $numNonAlpha );
	}
	
	if ($numNumberChars > 0) {
		$temp = str_shuffle ( $numberChars );
		$stack .= substr ( $temp, 0, $numNumberChars );
	}
	
	// Stack durchw�rfeln
	$stack = str_shuffle ( $stack );
	
	// R�ckgabe des erzeugten Passwort
	return $stack;
}

/*
 * $passwd = generatePassword ( 8, 2, 2, true );
 * echo $passwd . '<br>';
 *
 * $passwd = generatePassword ( 8, 0, 0, true );
 * echo $passwd . '<br>';
 *
 * $passwd = generatePassword ( 8 );
 * echo $passwd;
 */
function get_ip() {
	
	// Userip lesen
	$ipaddress = '';
	if (getenv ( 'HTTP_CLIENT_IP' ))
		$ipaddress = getenv ( 'HTTP_CLIENT_IP' );
	else if (getenv ( 'HTTP_X_FORWARDED_FOR' ))
		$ipaddress = getenv ( 'HTTP_X_FORWARDED_FOR' );
	else if (getenv ( 'HTTP_X_FORWARDED' ))
		$ipaddress = getenv ( 'HTTP_X_FORWARDED' );
	else if (getenv ( 'HTTP_FORWARDED_FOR' ))
		$ipaddress = getenv ( 'HTTP_FORWARDED_FOR' );
	else if (getenv ( 'HTTP_FORWARDED' ))
		$ipaddress = getenv ( 'HTTP_FORWARDED' );
	else if (getenv ( 'REMOTE_ADDR' ))
		$ipaddress = getenv ( 'REMOTE_ADDR' );
	else
		$ipaddress = 'UNKNOWN';
		
		// R�ckgabe deerzeugten IP
	return $ipaddress;
	
	// echo "ipaddress ", $ipaddress;
}
function getLocationByName($locationIP) {
	$locationIP = unserialize ( file_get_contents ( 'http://www.geoplugin.net/php.gp?ip=' . $_SERVER ['REMOTE_ADDR'] ) );
	return $locationIP;
}
function getCoordsByName($place) {
	// $_SERVER['DOCUMENT_ROOT'] = file_get_contents
	utf8_encode_deep ( $place );
	// echo $place;
	// $content = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($place) . '&sensor=false');
	$content = file_get_contents ( 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode ( $place ) );
	
	$json = json_decode ( $content, true );
	if (! $content || is_null ( $json )) {
		return false;
	}
	$coordinates = $json ['results'] [0] ['geometry'] ['location'];
	
	// var_dump($coordinates);
	
	return array (
			$coordinates ['lat'],
			$coordinates ['lng'] 
	);
}

/*
 * $google = getCoordsByName('1600 Amphitheatre Parkway, Mountain View, CA 94043');
 *
 * echo '<pre>'.print_r($google, true).'</pre>';
 */

function connectDB($db) {
	$db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
	if (mysqli_connect_errno ()) {
		printf ( "Verbindung fehlgeschlagen: %s\n", mysqli_connect_error () );
		exit ();
	}
	return array ($db );
}

// einzelfunktionen
function UserInsUpd($db, $sql) {
	//echo ' in function UserInsUpd  = ', $sql , "\n";
	
	//$json_response = array();
	//Umwandeln sonderzeichen  für db
	$sql1 = htmlentities($sql);
	mysqli_query ( $db, $sql ) ;
	
	if (mysqli_errno ( $db )) {
		$json_response = json_encode('error');
	} else {		
		$json_response = json_encode("success");	
	}
	return $json_response ;
	
	
	
}


?>