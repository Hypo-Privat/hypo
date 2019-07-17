<?php
session_start ();

// echo 'hallo : tJamContacts <br>';
header ( 'Content-type: application/json' );
date_default_timezone_set ( 'Europe/Berlin' );

// passwort erzeugen
// include ('encode.inc');
include ('tools.inc');
include ('sendmail.php');

$timestamp = time ();
$datum = date ( "Y-m-d", $timestamp );
$uhrzeit = date ( "H:i:s", $timestamp );
// echo $datum, " - ", $uhrzeit, " Uhr <br>";

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

//var_dump ( $_GET );

// $function = 'user_login_check';
// echo '$function = ', $function;

if ($function === 'user_new') {
	// echo 'if $function = ', $function . "\n";
	
	$usertyp = "R";
	$titel = strip_tags ( $_GET ['titel'] );
	
	$name = strip_tags ( $_GET ['name'] );
	$vorname = strip_tags ( $_GET ['vorname'] );
	
	$strasse = strip_tags ( $_GET ['strasse'] );
	$hausnr = strip_tags ( $_GET ['hausnr'] );
	$plz = strip_tags ( $_GET ['plz'] );
	$ort = strip_tags ( $_GET ['ort'] );
	
	$sprache = strip_tags ( $_GET ['sprache'] );
	
	$land = strip_tags ( $_GET ['land'] );
	
	$mail = strip_tags ( $_GET ['mail'] );
	$tel = ($_GET ['tel']);
	
	// $message = strip_tags($_POST['message']);
	$wiederruf = strip_tags ( $_GET ['wiederruf'] );
	// akzeptiert
	$agb = strip_tags ( $_GET ['agb'] );
	$news = strip_tags ( $_GET ['news'] );
	// akzeptiert
	
	$passwd = generatePassword ( 8, 2, 2, true );
	// echo 'passwd1 = ' . $passwd . "\n";
	/*
	 * $passwd = generatePassword ( 8, 0, 0, true );
	 * echo 'passwd2 = '.$passwd . '<br>';
	 *
	 * $passwd = generatePassword ( 8 );
	 * echo 'passwd3 = '.$passwd;
	 */
	
	$ipaddress = get_ip ();
	// user
	
	$place = ($strasse . ',' . $hausnr . ',' . $plz . ',' . $ort . ',' . $land);
	// echo "Place= " . $place . "\n";
	
	$latitude = 0;
	$longitude = 0;
	/*
	 * // http://ratgeber-community.com/latitude-und-longitude-durch-google-maps-und-php-ermitteln-197ddf64
	 * $coordinates[] = getCoordsByName($place);
	 *
	 * var_dump($coordinates);
	 *
	 * $latitude = $coordinates['lat'];
	 * $longitude = $coordinates['lng'];
	 */
	// http://www.a-coding-project.de/ratgeber/php/geolocation
	$locationIP = unserialize ( file_get_contents ( 'http://www.geoplugin.net/php.gp?ip=' . $_SERVER ['REMOTE_ADDR'] ) );
	// Adressdaten der IP
	// echo var_dump($locationIP) . "\n";
	
	$sql = "INSERT INTO hp_user
	(indexkey , usertype, datum_update , titel, name, vorname , strasse, hausnr, plz, ort , sprache, land, mail, tel_privat, agb,  wiederruf, news , passwd,  latitude, longitude, ipaddress)
	VALUES(" . $timestamp . ",'" . $usertyp . "', '" . $datum . ' ' . $uhrzeit . "','" . $titel . "','" . $name . "','" . $vorname . "','" . $strasse . "','" . $hausnr . "','" . $plz . "','" . $ort . "','" . $sprache . "','" . $land . "','" . $mail . "','" . $tel . "','" . $agb . "','" . $wiederruf . "','" . $news . "','" . $passwd . "'," . $latitude . ',' . $longitude . ",'" . $ipaddress . "')";
	
	// echo $sql . "\n";
	send_welcome ( $db, $passwd, $mail , $name, $vorname); // Mail an User
	send_anfrage ( $db, $sql, $mail , $name, $vorname); // verschickt mail an mich
	
	echo UserInsUpd ( $db, $sql );
	
	
} elseif ($function === 'getUserDetail') {
	// echo "function hier getUserDetail ";
	$INDEXKEY = strip_tags ( $_GET ['indexkey'] );
	
	// zum testen $email = 'demo@a-t-c.ch'; $pwd = 'demo1234';
	/*
	 * SELECT `indexkey`, `usertype`, `datum_update`, `titel`, `vorname`, `name`, `datum_geb`, `firma`, `strasse`, `hausnr`, `ort`, `kanton`, `plz`,
	 * `sprache`, `land`, `tel_buero`, `tel_privat`, `tel_fax`, `tel_mobil`, `mail`
	 * , `homepage`, `message`, `passwd`, `agb`, `latitude`, `longitude`, `ipaddress` FROM `hp_user` WHERE 1/*
	 */
	
	$sql = " select *	FROM hp_user
	where (indexkey = '" . $INDEXKEY . "') ";
	
	// Nur Innitialisieren für funktion
	$mail = '';
	$pwd = '';
	
	echo getUserDetail ( $db, $sql, $mail, $pwd );
	
	
} elseif ($function === 'user_login_check') {
	//echo "function hier user_login_check";
	$mail = strip_tags ( $_GET ['mail'] );
	$pwd = strip_tags ( $_GET ['pwd'] );
	// zum testen $email = 'demo@a-t-c.ch'; $pwd = 'demo1234';
	
	$sql = "select *	FROM hp_user
	where (mail = '" . $mail . "' and passwd = '" . $pwd . "') ";
	
	// echo "function hier user_login_check = ", $sql;
	echo getUserDetail ( $db, $sql, $mail, $pwd );
	
	
} elseif ($function === 'sendPW') {
	
	// echo "function hier sendPW "; WHERE id = (SELECT MAX(id) FROM text);
	$mail = strip_tags ( $_GET ['mail'] );
	$passwd = generatePassword ( 8, 2, 2, true );
	$name  = '';
	 $vorname = '';
	// send_password ( $db, $passwd, $mail ); // verschickt mail an mich
	send_welcome ( $db, $passwd, $mail, $name, $vorname); // verschickt mail an mich
	
	$sql = " UPDATE hp_user SET	passwd 	= '" . $passwd . "'
	where mail = '" . $mail . "'";
	// echo "function hier sendPW " . $sql ;
	echo UserInsUpd ( $db, $sql );
	
	
} elseif ($function === 'user_kontakt') {
	
	$usertyp = "A";
	$titel = strip_tags ( $_GET ['titel'] );
	$name = strip_tags ( $_GET ['name'] );
	$vorname = strip_tags ( $_GET ['vorname'] );
	
	$sprache = strip_tags ( $_GET ['sprache'] );
	
	$mail = strip_tags ( $_GET ['mail'] );
	$tel = ($_GET ['tel']);
	$message = strip_tags ( $_GET ['message'] );
	
	$ipaddress = get_ip ();
	
	$latitude = 0;
	$longitude = 0;
	
	// http://www.a-coding-project.de/ratgeber/php/geolocation
	$locationIP = unserialize ( file_get_contents ( 'http://www.geoplugin.net/php.gp?ip=' . $_SERVER ['REMOTE_ADDR'] ) );
	// Adressdaten der IP
	// echo var_dump($locationIP) . "\n";
	// echo "function === user_kontakt" ."\n";
	
	// was machen wenn User schon erfasst ist (eigene Tabelle anlegen f�r Mails ??)
	$sql = "INSERT INTO hp_user	(indexkey , usertype, datum_update , titel, name, vorname ,  sprache,  mail, tel_privat,       latitude, longitude, ipaddress)
	VALUES(" . $timestamp . ",'" . $usertyp . "', '" . $datum . ' ' . $uhrzeit . "','" . $titel . "','" . $name . "','" . $vorname . "','" . $sprache . "','" . $mail . "','" . $tel . "','" . $latitude . ',' . $longitude . ",'" . $ipaddress . "')";
	
	// echo $sql . "\n";
	
	send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	echo json_encode ( "success" );
	// echo UserInsUpd ( $db, $sql ); //speichert die Daten in DB

	
	
} elseif ($function === 'UserUpdate') {
	
	// alert("function=" + func + "&indexkey=" + indexkey + "&sprache=" + sprache + "&mobile=" + mobile + "&office=" + office + "&privat=" + privat + "&fax=" + fax);
	
	$indexkey = strip_tags ( $_GET ['indexkey'] );
	$datum_geb = strip_tags ( $_GET ['datum_geb'] );
	$sprache = strip_tags ( $_GET ['sprache'] );
	$mobil =  ( $_GET ['mobil'] );
	$buero =  ( $_GET ['buero'] );
	$privat = ( $_GET ['privat'] );
	$fax =  ( $_GET ['fax'] );
	
	$sql = "update hp_user SET sprache='" . $sprache . "',tel_privat ='" . $privat . "', tel_buero='"
			. $buero . "', tel_mobil='" . $mobil . "', tel_fax='" . $fax . "',  datum_geb='" . $datum_geb . "' where indexkey =" . $indexkey ;
	
	//echo $sql . "\n";
	
	echo UserInsUpd ( $db, $sql );
	
	
} elseif ($function === 'buerge') {
	// echo 'if $function = ', $function . "\n";
	/*
	 * "function=" + func + "&usr_indexkey=" + HP_Key + "&obj_indexkey=" + HP_obj_indexkey + "brg_&titel=" + brg_titel
	 * + "&brg_name=" + brg_name + "&brg_vorname=" + brg_vorname
	 * + "&brg_strasse=" + brg_strasse + "&brg_hausnr=" + brg_hausnr + "&brg_plz=" + brg_plz + "&brg_ort=" + brg_ort
	 * + "&brg_land=" + brg_land + "&brg_sprache=" + brg_sprache
	 * + "&brg_mail=" + brg_mail + "&brg_tel=" + brg_tel + "&brg_einkommen=" + brg_einkommen + "&brg_eink_whrg=" + brg_eink_whrg
	 * + "brg_&wiederruf=" + brg_wiederruf + "&brg_agb=" + agb
	 */
	
	$usr_indexkey = strip_tags ( $_GET ['usr_indexkey'] );
	$obj_indexkey = strip_tags ( $_GET ['obj_indexkey'] );
	$brg_titel = strip_tags ( $_GET ['brg_titel'] );
	
	$brg_name = strip_tags ( $_GET ['brg_name'] );
	$brg_vorname = strip_tags ( $_GET ['brg_vorname'] );
	$brg_datum_geb = strip_tags ( $_GET ['brg_datum_geb'] );
	
	$brg_strasse = strip_tags ( $_GET ['brg_strasse'] );
	$brg_hausnr = strip_tags ( $_GET ['brg_hausnr'] );
	$brg_plz = strip_tags ( $_GET ['brg_plz'] );
	$brg_ort = strip_tags ( $_GET ['brg_ort'] );
	
	$brg_sprache = strip_tags ( $_GET ['brg_sprache'] );
	
	$brg_land = strip_tags ( $_GET ['brg_land'] );
	
	$brg_mail = strip_tags ( $_GET ['brg_mail'] );
	$brg_tel =  ( $_GET ['brg_tel'] );
	
	// $message = strip_tags($_POST['message']);
	$brg_wiederruf = strip_tags ( $_GET ['brg_wiederruf'] );
	// akzeptiert
	$brg_agb = strip_tags ( $_GET ['brg_agb'] );
	// akzeptiert
	
	$sql = "INSERT INTO  hp_buerge ( darl_indexkey ,  brg_indexkey ,  usr_indexkey 
				,  brg_titel ,  brg_vorname ,  brg_name ,  brg_datum_geb ,   brg_strasse ,  brg_hausnr ,  brg_ort ,   brg_plz 
				,  brg_sprache ,  brg_land ,  brg_tel_privat ,    brg_mail ,  brg_agb )
				VALUES
 				( '" . $obj_indexkey . "','" . $timestamp . "','" . $usr_indexkey . "','" . $brg_titel . "','" . $brg_vorname . "','" . $brg_name . "','" . $brg_datum_geb . "','" . $brg_strasse . "','" . $brg_hausnr . "','" . $brg_ort . "','" . $brg_plz . "','" . $brg_sprache . "','" . $brg_land . "','" . $brg_tel . "','" . $brg_mail . "','" . $brg_agb . "')";
	
	// echo $sql . "\n";
	// send_anfrage ( $db, $sql, $mail ); // verschickt mail an mich
	
	echo UserInsUpd ( $db, $sql );
	
	
} elseif ($function === 'getBuergeDetail') {
	// echo "function hier getUserDetail ";
	$INDEXKEY = strip_tags ( $_GET ['darl_indexkey'] );
	
	$sql = " select *	FROM  hp_buerge
	where (brg_indexkey = '" . $INDEXKEY . "') ";
	
	// Nur Innitialisieren für funktion
	$mail = '';
	$pwd = '';
	
	echo getBuergeDetail ( $db, $sql, $mail, $pwd );
}

// alle funktionen
function getUserDetail($db, $sql, $mail, $pwd) {
	// echo "hier getUserDetail = ", $sql;
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	/*
	 * $sql = " indexkey, usertype, datum_update, titel, vorname, name, datum_geb, firma, strasse, hausnr, ort, kanton, plz,
	 * sprache, land, tel_buero, tel_privat, tel_fax, tel_mobil, mail
	 * , homepage, message, passwd, agb, latitude, longitude, ipaddress
	 * FROM hp_user
	 * where (indexkey = '" . $INDEXKEY . "') ";
	 */
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		if ($mail = htmlentities ( $row ['mail'] ) and $pwd = htmlentities ( $row ['passwd'] )) {
			// echo "hier $row[2] $row[3] $row[7] ";
			// $json_response[] = $row;
			
			$row_array ['indexkey'] = htmlentities ( $row ['indexkey'] );
			$row_array ['firma'] = htmlentities ( $row ['firma'] );
			$row_array ['titel'] = htmlentities ( $row ['titel'] );
			$row_array ['vorname'] = htmlentities ( $row ['vorname'] );
			$row_array ['name'] = htmlentities ( $row ['name'] );
			$row_array ['datum_geb'] = htmlentities ( $row ['datum_geb'] );
			
			$row_array ['strasse'] = htmlentities ( $row ['strasse'] );
			$row_array ['hausnr'] = htmlentities ( $row ['hausnr'] );
			$row_array ['plz'] = htmlentities ( $row ['plz'] );
			$row_array ['ort'] = htmlentities ( $row ['ort'] );
			$row_array ['kanton'] = htmlentities ( $row ['kanton'] );
			
			$row_array ['sprache'] = htmlentities ( $row ['sprache'] );
			$row_array ['land'] = htmlentities ( $row ['land'] );
			
			$row_array ['tel_buero'] = htmlentities ( $row ['tel_buero'] );
			$row_array ['tel_privat'] = htmlentities ( $row ['tel_privat'] );
			$row_array ['tel_fax'] = htmlentities ( $row ['tel_fax'] );
			$row_array ['tel_mobil'] = htmlentities ( $row ['tel_mobil'] );
			
			$row_array ['mail'] = htmlentities ( $row ['mail'] );
			$row_array ['homepage'] = htmlentities ( $row ['homepage'] );
			$row_array ['latitude'] = htmlentities ( $row ['latitude'] );
			$row_array ['longitude'] = htmlentities ( $row ['longitude'] );
			
			$index = htmlentities ( $row ['indexkey'] );
			$email = htmlentities ( $row ['mail'] );
			
			// speichert logindaten
			save_login ( $db, $index, $mail );
			
			// var_dump($json_response);
			// best�tigt das user angemeldet ist
			$row_array ['login'] = true;
			
		} else {
			$row_array ['login'] = false;
			// echo "keinen datensatz gefunden";
			/*
			 * $json = json_encode ( $json_response );
			 * $error = json_last_error_msg ();
			 * $error1 = json_last_error ();
			 * var_dump ( $json, $error, $error1 );
			 */
		}
		// utf8_encode_deep ( $row_array );
	
		array_push ( $json_response, $row_array );
		// echo json_encode ( $json_response );
		// echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK );
		// | JSON_NUMERIC_CHECK zerstört telefonnummern
		echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	}
	// Close the database connection
	//mysqli_close ( $db );
}


function save_login($db, $index, $email) {
	
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
		
		// echo "ipaddress ", $ipaddress;
	$sql = "INSERT INTO  login
	( EMAILADDRESS , INDEXKEY, IN_OUT )	VALUES
	('" . $email . "' , '" . $index . "','" . $ipaddress . "')";
	
	// save logindata echo $sql;
	mysqli_query ( $db, $sql );
}
function getBuergeDetail($db, $sql, $mail, $pwd) {
	// echo "hier getBuergeDetail = ", $sql;
	$result = mysqli_query ( $db, $sql );
	// Create an array
	$json_response = array ();
	
	/*
	 * SELECT SELECT `darl_indexkey`, `brg_indexkey`, `usr_indexkey`, `brg_datum_update`,
	 * `brg_titel`, `brg_vorname`, `brg_name`, `brg_datum_geb`, `brg_strasse`,
	 * `brg_hausnr`, `brg_ort`, `brg_plz`, `brg_sprache`, `brg_land`, `brg_tel_privat`,
	 * `brg_mail`, `brg_agb`, `brg_ausweis`, `brg_schufa`, `brg_lohn` FROM `hp_buerge` WHERE 1
	 */
	
	while ( $row = mysqli_fetch_array ( $result ) ) {
		if ($mail = htmlentities ( $row ['mail'] ) and $pwd = htmlentities ( $row ['passwd'] )) {
			// echo "hier $row[2] $row[3] $row[7] ";
			// $json_response[] = $row;
			
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
			
			$row_array ['brg_ausweis'] = htmlentities ( $row ['brg_ausweis'] );
			$row_array ['brg_schufa'] = htmlentities ( $row ['brg_schufa'] );
			$row_array ['brg_lohn'] = htmlentities ( $row ['brg_lohn'] );
			
			// var_dump($json_response);
			// best�tigt das user angemeldet ist
			$row_array ['login'] = true;
		} else {
			$row_array ['login'] = false;
			// echo "keinen datensatz gefunden";
			/*
			 * $json = json_encode ( $json_response );
			 * $error = json_last_error_msg ();
			 * $error1 = json_last_error ();
			 * var_dump ( $json, $error, $error1 );
			 */
		}
		// utf8_encode_deep ( $row_array );
		array_push ( $json_response, $row_array );
		echo json_encode ( $json_response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	}
	// Close the database connection
	//mysqli_close ( $db );
}

?>