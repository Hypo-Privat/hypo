<?php
{
	// echo 'hallo : newmail.php ' . "\n" ;
	header ( 'content-type: application/json; charset=utf-8' );
	date_default_timezone_set ( 'Europe/Berlin' );
	
	$timestamp = time ();
	$datum = date ( "Y-m-d", $timestamp );
	$uhrzeit = date ( "H:i:s", $timestamp );
	
	 echo $datum, " - ", $uhrzeit, " Uhr " . "\r\n";
	
	// db connect einbinden
	
	$db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
	if (mysqli_connect_errno ()) {
		printf ( "Verbindung fehlgeschlagen: %s\n", mysqli_connect_error () );
		exit ();
	}
	mysqli_query ( $db, "SET NAMES 'utf8'" );
	
	$z = 0;
	
	// sende mail an Jamfinder
	$sql = " SELECT distinct EMAILADDRESS , PREFIX, FIRSTNAME , LASTNAME 
			FROM JamContacts 
			where substr(NOTE,1,4) != 'done'  and EMAILADDRESS != '' or EMAILADDRESS = NULL limit 0, 50   ";
	// limit 5 , 3 ";
	//where EMAILADDRESS = 'gert.dorn@a-t-c.ch' 
	//where substr(NOTE,1,4) != 'done'  and EMAILADDRESS != '' or EMAILADDRESS = NULL limit 0, 50 "
	// The later will select rows starting from 5 and return three rows.
	
	/*
	 * (SELECT EMAILADDRESS , PREFIX, FIRSTNAME , LASTNAME FROM CONTACTS)
	 * (SELECT EMAILADDRESS , PREFIX, FIRSTNAME , LASTNAME FROM JamContacts);
	 */
	
	$result = mysqli_query ( $db, $sql );
	 //echo $sql;
	//echo 'result ' .$result;
	while ( $row = mysqli_fetch_array ( $result) ) {
		$z = $z + 1;
		$email = htmlentities ( $row ['EMAILADDRESS'] );
		$prefix = htmlentities ( $row ['PREFIX'] );
		$first = htmlentities ( $row ['FIRSTNAME'] );
		$last = htmlentities ( $row ['LASTNAME'] );
		
		text_mail ( $email, $prefix, $first, $last, $z, $db );
		
		/*
		 * if (!isset($first) ) { $first = strip_tags($email);}
		 * //echo $first ,"<br>";
		 */
		// echo $email , " - " , $first ," - " , $last ,"<br>";
	}
}
function update_record($Empfaenger, $db) {
	$timestamp = time ();
	$datum = date ( "Y-m-d", $timestamp );
	$uhrzeit = date ( "H:i:s", $timestamp );
	
	$sql = " UPDATE JamContacts SET	NOTE 	= 'done-" . $datum . $uhrzeit . "'	where EMAILADDRESS  = '" . $Empfaenger . "'";
	
	$sql = htmlentities ( $sql );
	mysqli_query ( $db, $sql );
	
	if (mysqli_errno ( $db )) {
		printf ( "update fehlgeschlagen: %s\n", mysqli_errno () );
		exit ();
	} else {
		// echo (" - success: %s\n");
	}
	
	// echo $sql ;
}

function text_mail($email, $prefix, $first, $last, $z, $db) {
	strip_tags ( $email );
	//echo $email , " - " , $first ," - " , $last ,"<br>";
	
	//http://phpforum.de/archiv_10903_Bilder@in@Php@Mail@uebermitteln_anzeigen.html
	//load the attachment from disk
	$attach_file_name = "jam-session.jpg";
	$handle = fopen($attach_file_name, "r");
	$attach_content = fread($handle, filesize($attach_file_name));
	fclose($handle);
	
	//$ImgName = '<img src="jam-session.jpg" alt="jam-session" border="1">';

	
	// anschreiben contacts
/*
 * 
 	$nachricht = '<html><body><h4>	Wir sind ein Startup und haben eine App <a href="http://jamfinder.info/">jamfinder.info</a> entwickelt welche Ihnen im Umkreis von 100km ihrer Umgebung <br>	</h4>
<h3>Tagesaktuell Jamsessions,&nbsp;Karaoke, Poetry Slam und andere Events anzeigt.</h3>
<p align="left"><img src="./php/jam-session.jpg" alt="Session" /> </p>
<p>	<span>Im Moment haben wir vor allem Schweiz und Deutschland		Events . Einzelne auch bereits weltweit. <br> Die Informationen		werden vor allem von Musikern/Akteuren/Bandmanager welche eine Tour		planen und&nbsp;	</span></p>
<p>	<span>Veranstaltern/Veranstaltungsorten/Lokalen die eine
		Event haben eingetragen.<br> <br> W&auml;re es nicht auch
		f&uuml;r euch Interessant die Veranstaltungen bei uns einzutragen.<br>
			Bestehende Events finden sie wenn sie Berlin , N&uuml; rnberg oder Z&uuml; rich suchen.<br>
			
		<br> Wir w&uuml;rden und freuen wenn Sie und unterst&uuml;tzen
		und Ihre Veranstaltung bei uns erfassen.
	</span></p>
<p>	<span>Ihr Team<br>	</span></p><p>	<span><a href="http://jamfinder.info/">JAMFINDER.INFO</a></span></p>
<p>		<span
			style="font-size: 12pt; line-height: 107%; font-family: &amp; amp;"
			lang="EN-GB">ENGLISH</span>
	</p>
<h4>We are a startup and have developed an app <a href="http://jamfinder.info/">jamfinder.info</a> which gives you within 100km of its environment</h4>
<h3>Daily Actual Jamsessions, Karaoke, Poetry Slam and other events.</h3>
<p align="left">
		<img src="jam-session.jpg" alt="Website Change Request" /> </p>
<p>
At the moment we have mainly events in Switzerland and Germany. Individuals already worldwide.
The information is mainly from musicians / actors / bandmanagers who plan a tour and
Organizers that have an event.
</p><p>
Would it be interesting for you to enter your events with us.
</p>
			<p>If you like to see how it work, please search for Berlin, Z&uuml; rich or N&uuml; rnberg, there are a lot of events.</p>
			<p>
We would be delighted to assist you and support you and your event with us.
</p><p> your team</p><p>	<span><a href="http://jamfinder.info/">JAMFINDER.INFO</a></span></p></body> </html>  ';
*/	
	// Anschreiben User
	
	  $nachricht = ' <html> <body>
	<p style="line-height: normal;">
		<span style="font-size: 12pt; font-family: &amp; amp;">Guten
			Tag,<br> <br> seit einiger Zeit werden&nbsp;Ihre Location
			und Ihre Veranstaltungen auf&nbsp; <a style="font-weight: bold;"
			href="http://jamfinder.info/"><span>jamfinder.info</span></a>
			angezeigt.
		</span>
	</p>
	<p style="line-height: normal;">
		<span style="font-size: 12pt; font-family: &amp; amp;">Um die
			Qualit&auml;t unseres Angebots zu erh&ouml;hen, bitten wir Sie sich
			mit Ihrer E Mail einzuloggen <br> und die angegebenen Termine zu
			pr&uuml;fen&nbsp;und zu aktualisieren. Falls Sie Ihr Passwort
			vergessen haben k&ouml;nnen Sie dieses in Menue login anfordern.
		</span>
	</p>
	<p style="line-height: normal;">
		<span style="font-size: 12pt; font-family: &amp; amp;"><br>
			Viele Musiker &ndash; K&uuml;nstler - Bandmanager welche ine Tour
			planen oder&nbsp;Veranstalter die einen Event machen nutzen unser
			Angebot.<br> <br> Wir w&uuml;rden uns freuen, wenn Sie und
			unterst&uuml;tzen und Ihre Daten aktualisieren und neue Events
			erfassen.<br> Wenn sie bereits erfasste Events sehen möschten
			suchen sie nach Berlin, Nürnberg oder Zürich.</span>
	</p>
	<p style="line-height: normal;">
		<span style="font-size: 12pt; font-family: &amp; amp;">Musikalische
			Gr&uuml;sse Team </span>
	</p>
	<p style="line-height: normal;">
		<span style="font-size: 12pt; font-family: &amp; amp;"><a
			style="font-weight: bold;" href="http://jamfinder.info/"><span>JAMFINDER.INFO</span></a>
		</span>
	</p>
	<p>
		<span
			style="font-size: 12pt; line-height: 107%; font-family: &amp; amp;"><o:p>&nbsp;</o:p></span>
	</p>
	<p>
		<span
			style="font-size: 12pt; line-height: 107%; font-family: &amp; amp;"
			lang="EN-GB">ENGLISH</span>
	</p>
	<p>
		<span style="font-size: 12pt; font-family: &amp; amp;" lang="EN">Good
			day,<br> <br> For some time your location and your events
			are displayed on<span style="font-weight: bold;"> </span><a
			style="font-weight: bold;" href="jamfinder.info"><span>jamfinder.info</span></a><span
			style="font-weight: bold;">.</span><br> To you to increase
			quality of our offer, please use your e mail address to log in<br>
			and check the dates specified and update. If you have forgotten your
			password you can request in menue login.<br> <br> Many musicians - artists - event
			manager planning a tour or organize an event use our offer.<br>
			<br> We would appreciate if you support us and update your data
			or insert new events.<br> If you like to see how it work, please
			search for Berlin, Zürich or Nürnberg, there are a lot of events.
		</span>
	</p>
	<p>
		<span style="font-size: 12pt; font-family: &amp; amp;" lang="EN"><br>
			Thank your team</span>
	</p>
	<p>
		<span style="font-size: 12pt; font-family: &amp; amp;" lang="EN"><br>
			<a style="font-weight: bold;" href="jamfinder.info"><span>JAMFINDER.INFO</span></a></span><span
			style="font-size: 12pt; font-family: &amp; amp;" lang="EN-GB"></span>
	</p>
	<p>
		<span><a href="http://jamfinder.info/"></a></span>
	</p></body> </html> ';
	 
	
	// f�r HTML-E-Mails muss der 'Content-type'-Header gesetzt werden
	/*
	 * $header = "MIME-Version: 1.0\r\n";
	 * $header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	 * $header .= "From: info@jamfinder.info\r\n";
	 * $header .= "Reply-To: info@jamfinder.info\r\n";
	 * $header .= "X-Mailer: PHP " . phpversion ();
	 * // $header .= "CC: susan@example.com\r\n";
	 * $header = "From: info@jamfinder.info";
	 */
	// f&uuml; r HTML-E-Mails muss der 'Content-type'-Header gesetzt werden
	$header = 'MIME-Version: 1.0' . "\r\n";
	$header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$header .= 'From: info@jamfinder.info' . "\r\n";
	$header .= 'Hello ' . $prefix . ' ' . $first . ' ' . $last . ', <br>';
	$header .= $nachricht;

	//$Empfaenger = 'gert.dorn@a-t-c.ch';
	$Empfaenger = $email ;
	$Betreff = 'Jamsessions, Karaoke, Poetry Slam and other Events';
	mail ( $Empfaenger, $Betreff, " ", $header );
	echo ( $z . ' ' . $email . ' ' . $first . ' ' . $last . "\r\n");
//	 echo $nachricht;
	
	// update_record ( $Empfaenger, $db );
	
	return;
}

?>

