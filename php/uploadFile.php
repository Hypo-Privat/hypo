<?php
// echo 'hallo : tJamContacts <br>';
header ( 'content-type: application/json; charset=utf-8' );
date_default_timezone_set ( 'Europe/Berlin' );

// http://php.net/manual/de/features.file-upload.php
try {
	// userfile ist name aus html form
	//var_dump ( $_POST );
	// var_dump ( $_FILES );
	
	// Verzeichnis f�r User Daten erstellen
	$saveDir = '../uploads/' . $_POST ['HP_Key'];
	if (! is_dir ( $saveDir )) {
		mkdir ( $saveDir, 0777, true );
		echo 'Verzeichnis erstellt' . $saveDir . "\n";
	}
	
	// Undefined | Multiple Files | $_FILES Corruption Attack
	// If this request falls under any of them, treat it invalid.
	if (! isset ( $_FILES ['userfile'] ['error'] ) || is_array ( $_FILES ['userfile'] ['error'] )) {
		throw new RuntimeException ( 'Invalid parameters. = Multiple Files' );
	}
	
	// Check $_FILES['userfile']['error'] value.
	switch ($_FILES ['userfile'] ['error']) {
		case UPLOAD_ERR_OK :
			break;
		case UPLOAD_ERR_NO_FILE :
			throw new RuntimeException ( 'No file was uploaded.' );
		case UPLOAD_ERR_INI_SIZE :
			throw new RuntimeException ( 'The uploaded file exceeds the upload_max_filesize directive in php.ini.' );
		case UPLOAD_ERR_FORM_SIZE :
			throw new RuntimeException ( 'The uploaded file exceeds the MAX_FILE_SIZE directive that 
                                was specified in the HTML form' );
		case UPLOAD_ERR_NO_TMP_DIR :
			throw new RuntimeException ( 'Missing a temporary folder. Introduced in PHP 4.3.10 and PHP 5.0.3.' );
		case UPLOAD_ERR_PARTIAL :
			throw new RuntimeException ( 'The uploaded file was only partially uploaded.' );
		case UPLOAD_ERR_CANT_WRITE :
			throw new RuntimeException ( 'Failed to write file to disk. Introduced in PHP 5.1.0.' );
		case UPLOAD_ERR_EXTENSION :
			throw new RuntimeException ( 'A PHP extension stopped the file upload. PHP does not provide a way 
                                to ascertain which extension caused the file upload to stop; examining 
                                the list of loaded extensions with phpinfo() may help. 
                                Introduced in PHP 5.2.0..' );
		default :
			throw new RuntimeException ( 'Unknown errors.' );
	}
	
	$HP_FileName = strip_tags ( ($_FILES ['userfile'] ['name']) );
	// echo $userFileName . "\n" ;
	// You should also check filesize here.
	define ( 'MB', 1048576 ); // Fielgrösse festlegen
	if ($_FILES ['userfile'] ['size'] > 10 * MB) {
		throw new RuntimeException ( 'Exceeded filesize limit.' );
	}
	
	// DO NOT TRUST $_FILES['userfile']['mime'] VALUE !!
	// Check MIME Type by yourself. use generateMimeType.php
	$finfo = new finfo(FILEINFO_MIME_TYPE); // mime_content_type
	if (false === $ext = array_search ( $finfo->file ( $_FILES ['userfile'] ['tmp_name'] ), array (
			
			'7z' => 'application/x-7z-compressed',
			'bat' => 'application/x-msdownload',
			'doc' => 'application/msword',
			'docm' => 'application/vnd.ms-word.document.macroenabled.12',
			'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'dot' => 'application/msword',
			'dotm' => 'application/vnd.ms-word.template.macroenabled.12',
			'dotx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
			'rtf' => 'application/rtf',
			'text' => 'text/plain',
			'txt' => 'text/plain',
			'bmp' => 'image/bmp',
			'gif' => 'image/gif',
			'png' => 'image/png',
			'jpe' => 'image/jpeg',
			'jpeg' => 'image/jpeg',
			'JPG' => 'image/jpeg',
			'jpg' => 'image/jpeg',
			'odf' => 'application/vnd.oasis.opendocument.formula',
			'odft' => 'application/vnd.oasis.opendocument.formula-template',
			'odm' => 'application/vnd.oasis.opendocument.text-master',
			'odp' => 'application/vnd.oasis.opendocument.presentation',
			'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
			'odt' => 'application/vnd.oasis.opendocument.text',
			'pdf' => 'application/pdf',
			'zip' => 'application/zip' 
	), true )) {
		throw new RuntimeException ( 'Invalid file format. = FILEINFO_MIME_TYPE' );
	}
	
	// You should name it uniquely.
	// DO NOT USE $_FILES['userfile']['name'] WITHOUT ANY VALIDATION !!
	// On this example, obtain safe unique name from its binary data.
	/*
	 * if (! move_uploaded_file ( $_FILES ['userfile'] ['tmp_name'], sprintf ( '../uploads/%s.%s', sha1_file ( $_FILES ['userfile'] ['tmp_name'] ), $ext ) )) {
	 * throw new RuntimeException ( 'Failed to move uploaded file.' );
	 * }
	 */
	
	//echo $saveDir . "/n";
	//echo $HP_FileName . "/n";
	if (! move_uploaded_file ( $_FILES ['userfile'] ['tmp_name'], sprintf ( $saveDir . '/%s', ($HP_FileName), '' ) )) {
		throw new RuntimeException ( 'Failed to move uploaded file.' );
	}
	//echo 'File is uploaded successfully.';
	
	// Bilder eigene Gruppe zuordnen wichtig für weitere Verarbeitung 
	$doc_filename = ($_POST ['FileName']);	
	$doc_group = ($_POST ['DocGroup']);
	
	//echo 'File is uploaded successfully.' + $doc_filename + ' -- ' + $doc_group  ;
	if ($doc_filename == "Bild"){
		$doc_group = 'B' ;
		//echo '$doc_group ' +  $doc_group  ;
	}else if ($doc_filename == "RenditeBild"){
		$doc_group = 'RB' ;
		//echo '$doc_group ' +  $doc_group  ;
	}
		
	// laden Daten in DB
	$sql = "Insert into hp_docs (doc_indexkey, doc_group , doc_filename,  doc_name ) 
			VALUES ('" . $_POST ['HP_Doc'] . "' , '" . $doc_group . "' , '" . $_POST ['FileName'] . "','" . $HP_FileName . "')";
	
	//echo $sql;
	InsertDoc ( $sql );	
	header("Location: ../UserProfil.html"); /* Browser umleiten */
	
} catch ( RuntimeException $e ) {
	
	echo $e->getMessage ();
}

// einzelfunktionen
function InsertDoc($sql) {
	 $db = mysqli_connect("server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo");
	//$db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
	// $db = mysqli_connect ("localhost", "phpmyadmin", "Name0815", "phpmyadmin");
	if (mysqli_connect_errno ()) {
		printf ( "Verbindung fehlgeschlagen: %s\n", mysqli_connect_error () );
		exit ();
	}
	// echo ' in function InsertDoc' ,$sql;
	mysqli_query ( $db, $sql ) or die ( mysqli_error ( $db ) );
	
	if (mysqli_errno ( $db )) {
		printf ( "Fehler bei InsertDoc %s", mysqli_error ( $db ) );
		mysqli_close ( $db );
		echo json_encode ( "error" );
		exit ();
	}
	
}

?>