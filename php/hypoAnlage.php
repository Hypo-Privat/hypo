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

$db = mysqli_connect ("server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo");
//$db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
//$db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
if (mysqli_connect_errno ()) {
	printf ( "Verbindung fehlgeschlagen: %s", mysqli_connect_error () );
	exit ();
}


// http://www.schnatterente.net/webdesign/php-mysql-utf8
mysqli_query($db, "SET NAMES 'utf8'");

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
//var_dump ( $_GET );
 
// $function = 'user_login_check';
// echo '$function = ', $function;
$json_response = array ();

if  ($function === 'insertAnlage') {
	//echo 'if $function = ', $function . "\n";
	
	$anl_indexkey = strip_tags ( $_GET ['HP_Key'] );
	//objektdaten speichern
	$anl_objekt= strip_tags ( $_GET ['ObjektID'] );
	$anl_betrag = strip_tags ( $_GET ['AnlBetrag'] );
	$anl_whrg = strip_tags ( $_GET ['AnlWhrg'] );
	$anl_zins = strip_tags ( $_GET ['AnlZins'] );
	$anl_zeit = strip_tags ( $_GET ['AnlZeit'] );
	$anl_zahltag = strip_tags ( $_GET ['Zahltag'] );
	$anl_typ = strip_tags ( $_GET ['AnlTyp'] );
	
	
	$sql = "INSERT INTO hp_anlage 	(anl_indexkey , anl_objekt, anl_betrag , anl_whrg, anl_zins, anl_zeit, anl_zahltag , anl_typ)
	VALUES('" . $anl_indexkey . "','" . $anl_objekt . "', " . $anl_betrag . ",'"  . $anl_whrg . "',"  . $anl_zins . "," . $anl_zeit . " , substr('" . $anl_zahltag ."',1,16) ,'" . $anl_typ . "')";
	
    //echo $sql . "\n";	
    echo UserInsUpd ( $db, $sql );    
    send_zahlung ( $db ,$anl_objekt, $anl_indexkey , $anl_zahltag ); // verschickt mail an mich und Anleger
} 

elseif  ($function === 'getAnlageDetail') {
	// echo 'if $function = ', $function . "\n";
	
	$anl_indexkey = strip_tags ( $_GET ['anl_indexkey'] );
//	$sql = "select distinct * from hp_anlage where anl_indexkey = substr('" . $anl_indexkey ."',1,10)" ;
	$sql =  "select distinct anl_objekt as Objekt , sum(anl_betrag) as Betrag , anl_whrg , anl_zins, anl_zeit , anl_typ from hp_anlage 
	where anl_indexkey = substr('" . $anl_indexkey ."',1,10)
	group by  anl_objekt , anl_whrg";

	//echo $sql . "\n";
	echo getAnlageDetail( $db, $sql );
	
}


elseif ($function === 'updateAnlage') {
	
	$subkey = date( "Hi", $timestamp );  //erzeugt laufnummer wenn mehrere Darlehen beantragt werden
	$darl_indexkey = strip_tags ( $_GET ['HP_Key'] ) . '_' .  $subkey;
	
		
	//objektdaten speichern
	$obj_whrg = strip_tags ( $_GET ['Obj_whrg'] );
	$obj_wert = strip_tags ( $_GET ['Obj_wert'] );
	$obj_strasse = strip_tags ( $_GET ['Obj_strasse'] );
	$obj_hausnr = strip_tags ( $_GET ['Obj_hausnr'] );
	$obj_plz = strip_tags ( $_GET ['Obj_plz'] );
	$obj_ort = strip_tags ( $_GET ['Obj_ort'] );
	$obj_land = strip_tags ( $_GET ['Obj_land'] );
	$obj_baujahr = strip_tags ( $_GET ['Obj_baujahr'] );
	
	
	
	$sql = "INSERT INTO hp_objekt( obj_indexkey ,	obj_baujahr ,	obj_strasse ,	obj_plz 	,obj_ort ,	obj_land ,	obj_wert ,		obj_whrg )
	VALUES('" . $darl_indexkey . "'," .  $obj_baujahr . ",'" .   $obj_strasse . "','" .	 $obj_plz . "','" . $obj_ort. "','" .	 $obj_land . "','" .	 $obj_wert . "','" .	 $obj_whrg ."')";
	//echo $sql . "\n";
	
	echo UserInsUpd ( $db, $sql );
	
	$darl_whrg = strip_tags ( $_GET ['Darl_whrg'] );
	$darl_betrag = strip_tags ( $_GET ['Darl_betrag'] );
	$darl_rate = strip_tags ( $_GET ['Darl_rate'] );
	$darl_zeit = strip_tags ( $_GET ['Darl_zeit'] );
	$darl_wunsch = strip_tags ( $_GET ['Darl_wunsch'] );
	$darl_verwendung = strip_tags ( $_GET ['Darl_verwendung'] );
	$darl_einkommen= strip_tags ( $_GET ['Darl_einkommen'] );
	 
	 $sql = "INSERT INTO hp_darlehen ( darl_indexkey , darl_einkommen , darl_whrg ,  darl_betrag, darl_rate, darl_zeit , darl_wunsch , darl_verwendung)
	         VALUES('" . $darl_indexkey . "'," . $darl_einkommen. ",'" . $darl_whrg . "'," . $darl_betrag .  "," . $darl_rate . "," . $darl_zeit . ",'" . $darl_wunsch . "','" . $darl_verwendung ."')";
	//echo $sql . "\n";
	 
	 $mail =  $darl_indexkey ;
	 send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	 
	 echo UserInsUpd ( $db, $sql );
	
}
elseif ($function === 'getLive') {
	
	
	if (isset ( $_GET ['obj_indexkey'] )) {
		//lifert einen datensatz zur jeweiligen Anlage  des kunden
		$obj_indexkey = strip_tags ( $_GET ['obj_indexkey'] );

		$sql = " SELECT distinct user.*, darl.* , obj.* , anl_indexkey  , anl_objekt , sum(anl_betrag) as sumbetrag ,anl_whrg
			FROM hp_user user
			inner JOIN hp_darlehen darl on substr(indexkey,1,10) = substr(darl_indexkey,1,10)
			inner JOIN hp_objekt obj on substr(darl_indexkey,1,10) = substr(obj_indexkey,1,10)
			left JOIN hp_anlage anl on (obj_indexkey) = (anl_objekt)
				where obj_indexkey = '" . $obj_indexkey . "' GROUP BY anl_objekt order by darl_wunsch ";
		
		
	} else {
		//Lifert alle Datensätze zur Auktion
		$sql = " SELECT distinct user.*, darl.* , obj.* , anl_indexkey  , anl_objekt , sum(anl_betrag) as sumbetrag ,anl_whrg
			FROM hp_user user
			inner JOIN hp_darlehen darl on substr(indexkey,1,10) = substr(darl_indexkey,1,10)
			inner JOIN hp_objekt obj on substr(darl_indexkey,1,10) = substr(obj_indexkey,1,10)
			left JOIN hp_anlage anl on (obj_indexkey) = (anl_objekt)
			GROUP BY anl_objekt order by darl_wunsch ";		
	}
	
	//echo $sql . "\n";

	echo getLive ( $db, $sql );
}
elseif ($function === 'getPic') {
	// echo 'if $function = ', $function . "\n";

	$indexkey = strip_tags ( $_GET ['obj_indexkey'] );
	// select * from hp_objekt where indexkey_obj like '1470337598'
	//$sql = "select distinct * from hp_docs where doc_indexkey = '" . $indexkey ."' and doc_filename = 'Bild' LIMIT 1 " ; //LIMIT 1
	$sql = "select distinct   O.obj_user as user , O.obj_indexkey ,   D.doc_indexkey , D.doc_group , D.doc_filename , D.doc_name
			from hp_objekt O
			inner join hp_docs  D on obj_indexkey = doc_indexkey
			where  obj_user = substr('" . $indexkey . "',1,10) and doc_filename = 'Bild' LIMIT 10";
	//echo $sql . "\n";
	echo getPic ( $db, $sql );
}


function getPic($db, $sql) {
	//echo "hier getDocs = ", $sql . "\n";
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
	//mysqli_close ( $db );
}

function getLive($db, $sql) {
	//echo "hier getLive = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();

	while ( $row = mysqli_fetch_array ( $result ) ) {

		$row_array ['indexkey'] = htmlentities ( $row ['indexkey'] );
		$row_array ['usertype'] = htmlentities ( $row ['usertype']  );
		$row_array ['titel'] = htmlentities ( $row ['titel'] 	 );
		$row_array ['vorname'] = htmlentities ( $row ['vorname']	 );
		$row_array ['name'] = htmlentities ( $row  ['name'] 	 );
		$row_array ['datum_geb'] = htmlentities ( $row ['datum_geb'] );
		$row_array ['land'] = htmlentities ( $row ['land']	 );
			
		$row_array ['obj_indexkey'] = htmlentities ( $row ['obj_indexkey'] );
		$row_array ['obj_insertdate'] = htmlentities ( $row ['obj_insertdate'] );

		$row_array ['obj_strasse'] = htmlentities ( $row ['obj_strasse'] );
		$row_array ['obj_plz'] = htmlentities ( $row ['obj_plz'] );
		$row_array ['obj_ort'] = htmlentities ( $row ['obj_ort'] );
		$row_array ['obj_land'] = htmlentities ( $row ['obj_land'] );
		$row_array ['obj_text'] = htmlentities ( $row ['obj_text'] );

		$row_array ['obj_wert'] = htmlentities ( $row ['obj_wert'] );
		$row_array ['obj_whrg'] = htmlentities ( $row ['obj_whrg'] );
		$row_array ['obj_baujahr'] = htmlentities ( $row ['obj_baujahr'] );
		$row_array ['obj_grundbuch'] = htmlentities ( $row ['obj_grundbuch'] );
		$row_array ['obj_schuld'] = htmlentities ( $row ['obj_schuld'] );
		$row_array ['obj_latitude'] = htmlentities ( $row ['obj_latitude'] );
		$row_array ['obj_longitude'] = htmlentities ( $row ['obj_longitude'] );

		//darl_indexkey darl_insertdate darl_whrg darl_betrag darl_rate darl_zeit darl_wunsch darl_zins darl_Verwendung
		$row_array ['darl_indexkey'] = htmlentities ( $row ['darl_indexkey'] );
		$row_array ['darl_einkommen'] = htmlentities ( $row ['darl_einkommen'] );
		$row_array ['darl_whrg'] = htmlentities ( $row ['darl_whrg'] );
		$row_array ['darl_betrag'] = htmlentities ( $row ['darl_betrag'] );
		$row_array ['darl_rate'] = htmlentities ( $row ['darl_rate'] );
		$row_array ['darl_zeit'] = htmlentities ( $row ['darl_zeit'] );
		$row_array ['darl_wunsch'] = htmlentities ( $row ['darl_wunsch'] );
		$row_array ['darl_verwendung'] = htmlentities ( $row ['darl_verwendung'] );
		$row_array ['darl_zins'] = htmlentities ( $row ['darl_zins']);

		//anl_indexkey 	anl_date 	anl_objekt 	anl_betrag 	anl_zins anl_zeit
		/*
		$row_array ['anl_date'] = htmlentities ( $row ['anl_date'] );
		$row_array ['anl_betrag'] = htmlentities ( $row ['anl_betrag'] );

		$row_array ['anl_zins'] = htmlentities ( $row ['anl_zins'] );
		$row_array ['anl_zeit'] = htmlentities ( $row ['anl_zeit'] );
		*/
		$row_array ['anl_indexkey'] = htmlentities ( $row ['anl_indexkey'] );
		$row_array ['anl_objekt'] = htmlentities ( $row ['anl_objekt'] );

		$row_array ['anl_betrag'] = htmlentities ( $row ['sumbetrag'] );
		$row_array ['anl_whrg'] = htmlentities ( $row ['anl_whrg'] );


		//	var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}

	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	//mysqli_close ( $db );
}

function getAnlageDetail($db, $sql) {
//	echo "hier getDocs = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();

	while ( $row = mysqli_fetch_array ( $result ) ) {
			
		/*
		$row_array ['anl_indexkey'] = htmlentities ( $row ['anl_indexkey'] );
		$row_array ['anl_date'] = htmlentities ( $row ['anl_date'] );	*/	
		$row_array ['anl_objekt'] = htmlentities ( $row ['Objekt'] );
		$row_array ['anl_whrg'] = htmlentities ( $row ['anl_whrg'] );
		$row_array ['anl_betrag'] = htmlentities ( $row ['Betrag'] );
		$row_array ['anl_zins'] = htmlentities ( $row ['anl_zins'] );
		$row_array ['anl_zeit'] = htmlentities ( $row ['anl_zeit'] );
		$row_array ['anl_typ'] = htmlentities ( $row ['anl_typ'] );
		
		
		//var_dump ( $row_array );
		array_push ( $json_response, $row_array );
	}

	echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
	// Close the database connection
	//mysqli_close ( $db );
}

?>