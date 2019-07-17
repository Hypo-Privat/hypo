<?php
session_start ();

// echo 'hallo : hypoRendite.php ' . "\n" ;
header ( 'content-type: application/json; charset=utf-8' );
date_default_timezone_set ( 'Europe/Berlin' );

$timestamp = time ();
$datum = date ( "Y-m-d", $timestamp );
$uhrzeit = date ( "H:i:s", $timestamp );
// echo $datum, " - ", $uhrzeit, " Uhr <br>";

include ('tools.inc');
include ('sendmail.php');

$db = mysqli_connect ( "server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo" );
// $db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
// localhost
// $db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
if (mysqli_connect_errno ()) {
	printf ( "Verbindung fehlgeschlagen: %s", mysqli_connect_error () );
	exit ();
}

if (mysqli_connect_errno ()) {
	printf ( "Verbindung fehlgeschlagen: %s", mysqli_connect_error () );
	exit ();
}

// http://www.schnatterente.net/webdesign/php-mysql-utf8
mysqli_query ( $db, "SET NAMES 'utf8'" );

if (isset ( $_GET ["function"] )) {
	// utf8_encode_deep($_GET);
	$function = strip_tags ( $_GET ['function'] );
	// echo "Its GET"; $method = "$_GET";
} elseif (isset ( $_POST ["function"] )) {
	// utf8_encode_deep($_POST);
	$function = strip_tags ( $_POST ['function'] );
	// echo "Its POST"; $method = "$_POST";
}

// Test record
// 2016-08-05 20:07:00 insert DB
// echo $datum . ' ' . $uhrzeit . "\n";
/*
 * echo 'Method = ' . $_SERVER ['REQUEST_METHOD'] . "\n";
 * echo '$_Get = ';
 * var_dump ( $_GET );
 * echo '$_Post = ';
 * var_dump ( $_POST );
 */
// echo '$_Server = ' ;
// var_dump($_SERVER);
// var_dump ( $_GET );

// $function = 'user_login_check';
// echo '$function = ', $function;
$json_response = array ();

if ($function === 'insertRenditeObjekt') {
	// echo 'if $function = ', $function . "\n";
	
	$rend_indexkey = $timestamp;
	$rend_user = strip_tags ( $_GET ['HP_Key'] );
	$rend_name = strip_tags ( $_GET ['Rend_name'] );
	$rend_typ = strip_tags ( $_GET ['Rend_typ'] );
	$rend_wert = strip_tags ( $_GET ['Rend_wert'] );
	$rend_wert_whrg = strip_tags ( $_GET ['Rend_wert_whrg'] );
	$rend_eigenkapital = strip_tags ( $_GET ['Rend_eigenkapital'] );
	$rend_fremdkapital = strip_tags ( $_GET ['Rend_fremdkapital'] );
	$rend_funding = strip_tags ( $_GET ['Rend_funding'] );
	$rend_zins = strip_tags ( $_GET ['Rend_zins'] );
	
	$rend_text = strip_tags ( $_GET ['Rend_text'] );
	
	$rend_strasse = strip_tags ( $_GET ['Rend_strasse'] );
	$rend_hausnr = strip_tags ( $_GET ['Rend_hausnr'] );
	$rend_plz = strip_tags ( $_GET ['Rend_plz'] );
	$rend_ort = strip_tags ( $_GET ['Rend_ort'] );
	$rend_land = strip_tags ( $_GET ['Rend_land'] );
	
	$rend_datumbis = strip_tags ( $_GET ['Rend_datum'] );
	$rend_sicherheit = strip_tags ( $_GET ['Rend_sicherheit'] );
	
	$sql = "INSERT INTO hp_renditeobjekt 	(rend_indexkey , rend_user, rend_name, rend_typ , rend_wert, rend_wert_whrg , rend_eigenkapital
			, rend_fremdkapital , rend_funding , rend_zins , rend_text , rend_strasse, rend_hausnr , rend_plz ,  rend_ort , rend_land , rend_datumbis , rend_sicherheit)
	
	VALUES('" . $rend_indexkey . "','" . $rend_user . "','" . $rend_name . "','" . $rend_typ . "'," . $rend_wert . ",'" . $rend_wert_whrg . "'," . $rend_eigenkapital . "," . $rend_fremdkapital . "," . $rend_funding . "," . $rend_zins . ",'" . $rend_text . "','" . $rend_strasse . "','" . $rend_hausnr . "','" . $rend_plz . "','" . $rend_ort . "','" . $rend_land . "','" . $rend_datumbis . "','" . $rend_sicherheit . "')";
	
	// echo $sql . "\n";
	echo UserInsUpd ( $db, $sql );
} 

elseif ($function === 'getRenditeDetail') {
	// echo 'if $function = ', $function . "\n";
	
	//$rend_indexkey = strip_tags ( $_GET ['rend_Indexkey'] );
	$rend_user = strip_tags ( $_GET ['rend_user'] );
	// $rend_user = 1471000331 ;
	$sql = "select distinct * from hp_renditeobjekt where rend_user =  $rend_user";
	/*
	 * $sql = "select distinct rend_objekt as Objekt , sum(rend_betrag) as Betrag , rend_whrg , rend_zins, rend_zeit from hp_renditeobjekt
	 * where rend_indexkey = substr('" . $rend_indexkey ."',1,10)
	 * group by rend_objekt , rend_whrg";
	 */
	// echo $sql . "\n";
	echo getRenditeDetail ( $db, $sql );
} 

elseif ($function === 'RenditeUpdate') {
	// echo 'RenditeUpdate '. "\n";
	// var_dump ( $_GET );
	
	$indexkey = strip_tags ( $_GET ['indexkey'] );
	$rend_indexkey = strip_tags ( $_GET ['rend_indexkey'] );
	
	// objektdaten speichern
	$rend_text = strip_tags ( $_GET ['rend_text'] );
	// $rend_text = strip_tags ( 'hallo' );
	
	$sql = "update hp_renditeobjekt set rend_text = '" . $rend_text . "' where rend_indexkey = '" . $rend_indexkey . "'";
	
	// echo $sql . "\n";
	
	echo UserInsUpd ( $db, $sql );
	
	$mail = $rend_indexkey;
	send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	
	echo UserInsUpd ( $db, $sql );
} 

elseif ($function === 'getRenditeLive') {
	// echo 'if $function = ', $function . "\n";
	//var_dump ( $_GET );
	if (isset ( $_GET ['rend_indexkey'] )) {
		// liefert einen datensatz zur jeweiligen Anlage des kunden
		
		$rend_indexkey = strip_tags ( $_GET ['rend_indexkey'] );
		$sql = "SELECT distinct robj.* , anl_indexkey , anl_objekt , sum(anl_betrag) as sumbetrag , anl_whrg
			FROM hp_renditeobjekt robj
			left JOIN hp_anlage anl on (rend_indexkey) = (anl_objekt)
			where rend_indexkey = '" . $rend_indexkey . "'
			group by anl_objekt";		
	
	} else {
		$sql = "SELECT distinct robj.* , anl_indexkey , anl_objekt , sum(anl_betrag) as sumbetrag , anl_whrg 
			FROM hp_renditeobjekt robj 
			left JOIN hp_anlage anl on (rend_indexkey) = (anl_objekt) 
				 
			group by anl_objekt";
	}
	//echo $sql . "\n";	
	echo getRenditeLive ( $db, $sql );
	
} elseif ($function === 'getRenditePic') {
	// echo 'if $function = ', $function . "\n";
		
	$indexkey = strip_tags ( $_GET ['rend_indexkey'] );
	// select * from hp_objekt where indexkey_obj like '1470337598'
	
	$sql = "select distinct r.rend_user as user , r.rend_indexkey , D.* from hp_docs D 
			inner join hp_renditeobjekt r on rend_indexkey = doc_indexkey 
			where doc_indexkey = '" . $indexkey . "' and doc_filename = 'RenditeBild' LIMIT 10 "; // LIMIT 1
	   //echo $sql . "\n";
	echo getRenditePic ( $db, $sql );
}
function getRenditePic($db, $sql) {
	// echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		$row_array ['user'] = htmlentities ( $row ['user'] );
		$row_array ['doc_indexkey'] = htmlentities ( $row ['doc_indexkey'] );
		$row_array ['doc_filename'] = htmlentities ( $row ['doc_filename'] );
		$row_array ['doc_name'] = htmlentities ( $row ['doc_name'] );
		
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	// mysqli_close ( $db );
}
function getRenditeLive($db, $sql) {
	// echo "hier getRenditeLive(= ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		
		$row_array ['rend_indexkey'] = htmlentities ( $row ['rend_indexkey'] );
		$row_array ['rend_user'] = htmlentities ( $row ['rend_user'] );
		$row_array ['rend_name'] = htmlentities ( $row ['rend_name'] );
		$row_array ['rend_typ'] = htmlentities ( $row ['rend_typ'] );
		$row_array ['rend_wert'] = htmlentities ( $row ['rend_wert'] );
		$row_array ['rend_wert_whrg'] = htmlentities ( $row ['rend_wert_whrg'] );
		$row_array ['rend_eigenkapital'] = htmlentities ( $row ['rend_eigenkapital'] );
		$row_array ['rend_fremdkapital'] = htmlentities ( $row ['rend_fremdkapital'] );
		
		$row_array ['rend_funding'] = htmlentities ( $row ['rend_funding'] );
		$row_array ['rend_zins'] = htmlentities ( $row ['rend_zins'] );
		$row_array ['rend_text'] = htmlentities ( $row ['rend_text'] );
		$row_array ['rend_strasse'] = htmlentities ( $row ['rend_strasse'] );
		$row_array ['rend_hausnr'] = htmlentities ( $row ['rend_hausnr'] );
		$row_array ['rend_plz'] = htmlentities ( $row ['rend_plz'] );
		$row_array ['rend_ort'] = htmlentities ( $row ['rend_ort'] );
		
		$row_array ['rend_land'] = htmlentities ( $row ['rend_land'] );
		$row_array ['rend_datumbis'] = htmlentities ( $row ['rend_datumbis'] );
		$row_array ['rend_sicherheit'] = htmlentities ( $row ['rend_sicherheit'] );
		
		// anl_indexkey anl_date anl_objekt anl_betrag anl_zins anl_zeit
		/*
		 * $row_array ['anl_date'] = htmlentities ( $row ['anl_date'] );
		 * $row_array ['anl_betrag'] = htmlentities ( $row ['anl_betrag'] );
		 *
		 * $row_array ['anl_zins'] = htmlentities ( $row ['anl_zins'] );
		 * $row_array ['anl_zeit'] = htmlentities ( $row ['anl_zeit'] );
		 */
		$row_array ['anl_indexkey'] = htmlentities ( $row ['anl_indexkey'] );
		$row_array ['anl_objekt'] = htmlentities ( $row ['anl_objekt'] );
		$row_array ['anl_betrag'] = htmlentities ( $row ['sumbetrag'] );
		$row_array ['anl_whrg'] = htmlentities ( $row ['anl_whrg'] );
		
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	// mysqli_close ( $db );
}
function getRenditeDetail($db, $sql) {
	// echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		
		$row_array ['rend_indexkey'] = htmlentities ( $row ['rend_indexkey'] );
		$row_array ['rend_user'] = htmlentities ( $row ['rend_user'] );
		$row_array ['rend_name'] = htmlentities ( $row ['rend_name'] );
		$row_array ['rend_typ'] = htmlentities ( $row ['rend_typ'] );
		$row_array ['rend_wert'] = htmlentities ( $row ['rend_wert'] );
		$row_array ['rend_wert_whrg'] = htmlentities ( $row ['rend_wert_whrg'] );
		$row_array ['rend_eigenkapital'] = htmlentities ( $row ['rend_eigenkapital'] );
		$row_array ['rend_fremdkapital'] = htmlentities ( $row ['rend_fremdkapital'] );
		
		$row_array ['rend_funding'] = htmlentities ( $row ['rend_funding'] );
		$row_array ['rend_zins'] = htmlentities ( $row ['rend_zins'] );
		$row_array ['rend_text'] = htmlentities ( $row ['rend_text'] );
		$row_array ['rend_strasse'] = htmlentities ( $row ['rend_strasse'] );
		$row_array ['rend_hausnr'] = htmlentities ( $row ['rend_hausnr'] );
		$row_array ['rend_plz'] = htmlentities ( $row ['rend_plz'] );
		$row_array ['rend_ort'] = htmlentities ( $row ['rend_ort'] );
		
		$row_array ['rend_land'] = htmlentities ( $row ['rend_land'] );
		$row_array ['rend_datumbis'] = htmlentities ( $row ['rend_datumbis'] );
		$row_array ['rend_sicherheit'] = htmlentities ( $row ['rend_sicherheit'] );
		
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
}

?>