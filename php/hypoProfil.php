<?php
session_start ();

// echo 'hallo : tJamContacts <br>';
header ( 'content-type: application/json; charset=utf-8' );
date_default_timezone_set ( 'Europe/Berlin' );

$timestamp = time ();
$datum = date ( "Y-m-d", $timestamp );
$uhrzeit = date ( "H:i:s", $timestamp );
// echo $datum, " - ", $uhrzeit, " Uhr <br>";

include ('tools.inc');
include ('sendmail.php');

$db = mysqli_connect ( "server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo" );
// $db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
// $db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
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

// $function = 'user_login_check';
// echo '$function = ', $function;
if ($function === 'getObjekt') {
	// echo 'if $function = ', $function . "\n";
	
	$table = 'hp_objekt';
	$indexkey = strip_tags ( $_GET ['HP_Key'] );
	
	// select * from hp_objekt where indexkey_obj like '1470337598%'
	
	$sql = "select * from hp_objekt  where obj_indexkey like '" . $indexkey . "%'";
	
	// echo $sql . "\n";
	
	echo getdataobjekt ( $db, $sql );
} 

elseif ($function === 'getDocs') {
	// echo 'if $function = ', $function . "\n";
	
	$indexkey = strip_tags ( $_GET ['HP_Key'] );
	// $docgroup = strip_tags ( $_GET ['DocGroup'] );
	
	// select * from hp_objekt where indexkey_obj like '1470337598'
	
	// $sql = "select distinct * from hp_docs where doc_group = '" . $docgroup ."' and doc_indexkey = substr('" . $indexkey ."',1,10)" ;
//	$sql = "select distinct * from hp_docs where  doc_indexkey = substr('" . $indexkey . "',1,10) order by doc_indexkey , doc_group";
	$sql = "select distinct   O.obj_user as user , O.obj_indexkey ,   D.doc_indexkey , D.doc_group , D.doc_filename , D.doc_name
			from hp_objekt O 
			inner join hp_docs  D on obj_indexkey = doc_indexkey
			where  obj_user = substr('" . $indexkey . "',1,10)
				union all
			select distinct R.rend_user as user ,R.rend_indexkey ,     D.doc_indexkey , D.doc_group , D.doc_filename , D.doc_name
			from hp_docs  D
			inner join hp_renditeobjekt R on rend_indexkey = doc_indexkey 
			where  rend_user = substr('" . $indexkey . "',1,10)
		
				union all
			select distinct U.indexkey as user ,U.indexkey ,     D.doc_indexkey , D.doc_group , D.doc_filename , D.doc_name
			from hp_docs  D
			inner join hp_user U on indexkey = doc_indexkey 
			where  indexkey = substr('" . $indexkey . "',1,10)
			order by 4";
	
	// echo $sql . "\n";
	
	echo getDocs ( $db, $sql );
}
function getdataobjekt($db, $sql) {
	// echo "hier getdataobjekt = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	/*
	 * obj_indexkey obj_insertdate obj_strasse
	 * obj_plz obj_ort obj_land obj_wert obj_grundbuch obj_schuld obj_latitude obj_longitude
	 */
	while ( $row = mysqli_fetch_array ( $result ) ) {
		
		$row_array ['obj_indexkey'] = htmlentities ( $row ['obj_indexkey'] );
		$row_array ['obj_user'] = htmlentities ( $row ['obj_user'] );
		$row_array ['obj_insertdate'] = htmlentities ( $row ['obj_insertdate'] );
		
		$row_array ['obj_strasse'] = htmlentities ( $row ['obj_strasse'] );
		$row_array ['obj_plz'] = htmlentities ( $row ['obj_plz'] );
		$row_array ['obj_ort'] = htmlentities ( $row ['obj_ort'] );
		$row_array ['obj_land'] = htmlentities ( $row ['obj_land'] );
		$row_array ['obj_text'] = htmlentities ( $row ['obj_text'] );
		
		$row_array ['obj_wert'] = htmlentities ( $row ['obj_wert'] );
		$row_array ['obj_whrg'] = htmlentities ( $row ['obj_whrg'] );
		$row_array ['obj_grundbuch'] = htmlentities ( $row ['obj_grundbuch'] );
		$row_array ['obj_schuld'] = htmlentities ( $row ['obj_schuld'] );
		$row_array ['obj_latitude'] = htmlentities ( $row ['obj_latitude'] );
		$row_array ['obj_longitude'] = htmlentities ( $row ['obj_longitude'] );
		
		$row_array ['login'] = true;
		
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	// mysqli_close ( $db );
}
function getDocs($db, $sql) {
	// echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		$row_array ['user'] = htmlentities ( $row ['user'] );

		$row_array ['doc_indexkey'] = htmlentities ( $row ['doc_indexkey'] );
		$row_array ['doc_group'] = htmlentities ( $row ['doc_group'] );
		$row_array ['doc_filename'] = htmlentities ( $row ['doc_filename'] );
		$row_array ['doc_name'] = htmlentities ( $row ['doc_name'] );
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	// mysqli_close ( $db );
}

?>