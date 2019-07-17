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
//$db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
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
// var_dump ( $_GET );
// $function = 'user_login_check';
// echo '$function = ', $function;
if ($function === 'darlehenReq') {
	
	$table = 'hp_darlehen';
	$subkey = date ( "Hi", $timestamp ); // erzeugt laufnummer wenn mehrere Darlehen beantragt werden
	$darl_indexkey = strip_tags ( $_GET ['HP_Key'] ) . '_' . $subkey;
	$hp_key = strip_tags ( $_GET ['HP_Key'] );
	
	// objektdaten speichern
	
	$obj_whrg = strip_tags ( $_GET ['Obj_whrg'] );
	$obj_wert = strip_tags ( $_GET ['Obj_wert'] );
	$obj_strasse = strip_tags ( $_GET ['Obj_strasse'] );
	$obj_hausnr = strip_tags ( $_GET ['Obj_hausnr'] );
	$obj_plz = strip_tags ( $_GET ['Obj_plz'] );
	$obj_ort = strip_tags ( $_GET ['Obj_ort'] );
	$obj_land = strip_tags ( $_GET ['Obj_land'] );
	$obj_baujahr = strip_tags ( $_GET ['Obj_baujahr'] );
	$obj_text = strip_tags ( $_GET ['Obj_text'] );
	
	$sql = "INSERT INTO hp_objekt( obj_user , obj_indexkey ,	obj_baujahr ,	obj_strasse ,	obj_plz 	,obj_ort ,	obj_land ,	obj_wert ,		obj_whrg , obj_text)
	VALUES('" . $hp_key . "','" . $darl_indexkey . "'," . $obj_baujahr . ",'" . $obj_strasse . "','" . $obj_plz . "','" . $obj_ort . "','" . $obj_land . "'," . $obj_wert . ",'" . $obj_whrg . "','" . $obj_text . "')";
	// echo $sql . "\n";
	
	echo UserInsUpd ( $db, $sql );
	
	$darl_whrg = strip_tags ( $_GET ['Darl_whrg'] );
	$darl_betrag = strip_tags ( $_GET ['Darl_betrag'] );
	$darl_rate = strip_tags ( $_GET ['Darl_rate'] );
	$darl_zeit = strip_tags ( $_GET ['Darl_zeit'] );
	$darl_zins = strip_tags ( $_GET ['Darl_zins'] );
	$darl_wunsch = strip_tags ( $_GET ['Darl_wunsch'] );
	$darl_verwendung = strip_tags ( $_GET ['Darl_verwendung'] );
	$darl_einkommen = strip_tags ( $_GET ['Darl_einkommen'] );
	
	$sql = "INSERT INTO " . $table . "( darl_indexkey , darl_einkommen , darl_whrg ,  darl_betrag, darl_rate, darl_zeit , darl_zins , darl_wunsch , darl_verwendung)
	         VALUES('" . $darl_indexkey . "'," . $darl_einkommen . ",'" . $darl_whrg . "'," . $darl_betrag . "," . $darl_rate . "," . $darl_zeit . "," . $darl_zins . ",'" . $darl_wunsch . "','" . $darl_verwendung . "')";
	// echo $sql . "\n";
	
	$mail = $darl_indexkey;
	send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	
	echo UserInsUpd ( $db, $sql );
	
} elseif ($function === 'objektInfo') {
	
	$table = 'hp_darlehen';
	$subkey = date ( "Hi", $timestamp ); // erzeugt laufnummer wenn mehrere Darlehen beantragt werden
	$obj_indexkey = strip_tags ( $_GET ['HP_Key'] ) . '_' . $subkey;
	
	// objektdaten speichern
	$obj_whrg = strip_tags ( $_GET ['Obj_whrg'] );
	$obj_wert = strip_tags ( $_GET ['Obj_wert'] );
	$obj_strasse = strip_tags ( $_GET ['Obj_strasse'] );
	$obj_hausnr = strip_tags ( $_GET ['Obj_hausnr'] );
	$obj_plz = strip_tags ( $_GET ['Obj_plz'] );
	$obj_ort = strip_tags ( $_GET ['Obj_ort'] );
	$obj_land = strip_tags ( $_GET ['Obj_land'] );
	$obj_baujahr = strip_tags ( $_GET ['Obj_baujahr'] );
	
	$sql = "INSERT INTO hp_objekt( obj_indexkey ,	obj_baujahr ,	obj_strasse ,	obj_plz 	,obj_ort ,	obj_land ,	obj_wert ,		obj_whrg )
	VALUES('" . $obj_indexkey . "'," . $obj_baujahr . ",'" . $obj_strasse . "','" . $obj_plz . "','" . $obj_ort . "','" . $obj_land . "'," . $obj_wert . ",'" . $obj_whrg . "')";
	// echo $sql . "\n";
	
	echo UserInsUpd ( $db, $sql );
	
	$mail = $darl_indexkey;
	send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	
	echo UserInsUpd ( $db, $sql );
} elseif ($function === 'getDarlehenDetail') {
	// echo 'if $function = ', $function . "\n";
	/*
select darl.* , brg.* from hp_darlehen darl
	 inner JOIN hp_buerge brg on substr(darl.darl_indexkey,1,10) = substr(brg_indexkey,1,10)
	  where darl.darl_indexkey like "1470337598%"
	 GROUP BY darl.darl_indexkey
	 */
	$indexkey = strip_tags ( $_GET ['darl_indexkey'] );
	$sql = "select * from hp_darlehen  where darl_indexkey like '" . $indexkey . "%'";
	
	// echo $sql . "\n";
	echo getDarlehenDetail ( $db, $sql );
}

elseif ($function === 'getBuergeDetail') {
	// echo 'if $function = ', $function . "\n";
	/*
	SELECT `darl_indexkey`, `brg_indexkey`, `usr_indexkey`, `brg_datum_update`, 
	`brg_titel`, `brg_vorname`, `brg_name`, `brg_datum_geb`, `brg_strasse`, `brg_hausnr`, `brg_ort`, `brg_plz`, `brg_sprache`, `brg_land`, 
	`brg_tel_privat`, `brg_mail`, `brg_agb`, `brg_ausweis`, `brg_schufa`, `brg_lohn` FROM `hp_buerge` WHERE 1
	*/
	$indexkey = strip_tags ( $_GET ['darl_indexkey'] );
	$sql = "select * from hp_buerge  where darl_indexkey like '" . $indexkey . "%'";

	// echo $sql . "\n";
	echo getBuergeDetail ( $db, $sql );
}


elseif ($function === 'ObjektUpdate') {
	//echo 'RenditeUpdate '. "\n";
	//var_dump ( $_GET );

	$indexkey = strip_tags ( $_GET ['indexkey'] ) ;
	$obj_indexkey = strip_tags ( $_GET ['obj_indexkey'] ) ;


	//objektdaten speichern
	$obj_text = strip_tags ( $_GET ['obj_text'] );
	//$rend_text = strip_tags ( 'hallo' );



	$sql = "update hp_objekt set obj_text = '" . $obj_text . "' where obj_indexkey = '" . $obj_indexkey ."'" ;

	//echo $sql . "\n";

	echo UserInsUpd ( $db, $sql );

	$mail =  $obj_indexkey ;
	send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich

	echo UserInsUpd ( $db, $sql );

}

function getBuergeDetail($db, $sql) {
	// echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();

	while ( $row = mysqli_fetch_array ( $result ) ) {

		// darl_indexkey darl_insertdate darl_whrg darl_betrag darl_rate darl_zeit darl_wunsch darl_zins darl_Verwendung
		$row_array ['darl_indexkey'] = htmlentities ( $row ['darl_indexkey'] );
		$row_array ['brg_indexkey'] = htmlentities ( $row ['brg_indexkey'] );
		$row_array ['usr_indexkey'] = htmlentities ( $row ['usr_indexkey'] );
		
		$row_array ['brg_titel'] = htmlentities ( $row ['brg_titel'] );
		$row_array ['brg_vorname'] = htmlentities ( $row ['brg_vorname'] );
		$row_array ['brg_name'] = htmlentities ( $row ['brg_name'] );
		$row_array ['brg_datum_geb'] = htmlentities ( $row ['brg_datum_geb'] );
			
		$row_array ['brg_strasse'] = htmlentities ( $row ['brg_strasse'] );
		$row_array ['brg_hausnr'] = htmlentities ( $row ['brg_hausnr'] );
		$row_array ['brg_plz'] = htmlentities ( $row ['brg_plz'] );
		$row_array ['brg_ort'] = htmlentities ( $row ['brg_ort'] );
			
		$row_array ['brg_sprache'] = htmlentities ( $row ['brg_sprache'] );
		$row_array ['brg_land'] = htmlentities ( $row ['brg_land'] );			

		$row_array ['brg_tel_privat'] = htmlentities ( $row ['brg_tel_privat'] );			
		$row_array ['brg_mail'] = htmlentities ( $row ['brg_mail'] );
		$row_array ['brg_agb'] = htmlentities ( $row ['brg_agb'] );
		//dokumente
		$row_array ['brg_ausweis'] = htmlentities ( $row ['brg_ausweis'] );
		$row_array ['brg_schufa'] = htmlentities ( $row ['brg_schufa'] );
		$row_array ['brg_lohn'] = htmlentities ( $row ['brg_lohn'] );

		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}

	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	//mysqli_close ( $db );
}


function getDarlehenDetail($db, $sql) {
	// echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		
		// darl_indexkey darl_insertdate darl_whrg darl_betrag darl_rate darl_zeit darl_wunsch darl_zins darl_Verwendung
		$row_array ['darl_indexkey'] = htmlentities ( $row ['darl_indexkey'] );
		$row_array ['darl_einkommen'] = htmlentities ( $row ['darl_einkommen'] );
		$row_array ['darl_whrg'] = htmlentities ( $row ['darl_whrg'] );
		$row_array ['darl_betrag'] = htmlentities ( $row ['darl_betrag'] );
		$row_array ['darl_rate'] = htmlentities ( $row ['darl_rate'] );
		$row_array ['darl_zeit'] = htmlentities ( $row ['darl_zeit'] );
		$row_array ['darl_wunsch'] = htmlentities ( $row ['darl_wunsch'] );
		$row_array ['darl_verwendung'] = htmlentities ( $row ['darl_verwendung'] );
		$row_array ['darl_zins'] = htmlentities ( $row ['darl_zins'] );
		
		// var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}
	
	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	//mysqli_close ( $db );
}

?>