<?php
// http://www.php-kurs.com/html-e-mail-mit-php-erstellen.htm
date_default_timezone_set ( 'Europe/Berlin' );


function send_anfrage($db, $sql, $mail) {
	$mailtext = '<html>
<head>    <title>Hypo-Privat Anfrage</title></head>
	
<body>	
	
<table rules="all" style="border-color: #666;" cellpadding="10" border="1">
  <tr>   <td><strong><strong>Hypo-Privat Anfrage von ' . $mail . '</strong> </td>  </tr>
  <tr>  <td>  Mailtext: </td> </tr>
  <tr>  <td>  ' . $sql . '</td>  </tr>
</table>
	
</body>
</html>';
	$absender = $mail;
	$empfaenger = "support@hypo-privat.com";
	$betreff = "Hypo Anfrage";
	// $antwortan = "ICH@testkarnickel.de";
	
	$header = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	
	$header .= "From: $absender\r\n";
	// $header .= "Reply-To: $antwortan\r\n";
	// $header .= "Cc: $cc\r\n"; // falls an CC gesendet werden soll
$header .= 'Bcc: support@hypo-privat.com' . "\r\n";
	$header .= "X-Mailer: PHP " . phpversion ();
	
	mail ( $empfaenger, $betreff, $mailtext, $header );
	
	// echo "Mail wurde gesendet!";
	$strReturnhtml = "www.hypo-privat.com/index.html#cta";
	return json_encode ( array (
			utf8_encode ( "success" ) 
	) );
}

function send_password($db, $passwd, $mail) {
	$mailtext = '<html>
<head> <title>Neues Passwort</title></head>
 
<body>
 
<table rules="all" style="border-color: #666;" cellpadding="10" border="1">
  <tr>
    <td><strong>Ihr neues Passwort fuer Hypo-Privat ist :</strong> </td><td>' . $passwd . '</td></td>
    <td><strong> Bitte loggen Sie sich jetzt  <a href=http://hypo-privat.com/index.html#cta > Login </a>  ein</strong></td>
  </tr>
 
</table>
 
<p>Vielen Dank für Ihr Vertrauen in unseren Service</p>
 
</body>
</html>';
	
	
	$empfaenger = $mail;
	$absender = "support@hypo-privat.com";
	$betreff = "Hypo-Privat Ihr Passwort";
	// $antwortan = "ICH@testkarnickel.de";
	
	$header = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	
	$header .= "From: $absender\r\n";
	// $header .= "Reply-To: $antwortan\r\n";
	// $header .= "Cc: $cc\r\n"; // falls an CC gesendet werden soll
$header .= 'Bcc: support@hypo-privat.com' . "\r\n";
	$header .= "X-Mailer: PHP " . phpversion ();
	
	mail ( $empfaenger, $betreff, $mailtext, $header );
	
	return json_encode ( array (
			utf8_encode ( "success" ) 
	) );
	
	$strReturnhtml = "www.hypo-privat.com/index.html#cta";
	
}



function send_welcome($db, $passwd, $mail , $name, $vorname) {
	
	$mailtext = '<html><body>
			<table 	style="border: 2px solid black; background-color: #FFFFE0; border-collapse: collapse; font-family: Georgia, Garamond, Serif; color: black;">
		<thead>
			<tr>
				<th colspan=2	style="width: 50%; font: bold 18px/1.1em Arial, Helvetica, Sans-Serif; text-shadow: 1px 1px 4px black; letter-spacing: 0.3em; background-color: #BDB76B; color: white;">
			Willkommen bei Hypo Privat</th>
			</tr>
		</thead>
		<tbody style="font-style: normal;">
	
			<tr style="border: 1px solid black;">
				<td colspan=2>Sehr geehrter/e ' . $vorname . '  ' . $name . ', <br>
					Ihr neues Passwort fuer Hypo-Privat ist :  ' . $passwd . '<br> 
							Bitte loggen Sie sich jetzt mit Ihrer E-Mail <a href=http://hypo-privat.com/index.html#cta > Login </a>  ein und passen Sie Ihre pers&ouml;nlichen Daten im Profil an.
				</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
			<td><h2>Vielen Dank f&uuml;r Ihr Vertrauen in unseren Service</h2></td>
			
			</tr>
		</tbody>
		<tfoot style="border: 1px solid black; background-color: white;">
			<tr>
				<td colspan="4" class="rounded-foot-left"><em>Sollten Sie
						Fragen zu unserem Angebot		haben,<br> senden sie diese E-Mail bitte mit dem Vermerk <b>
							"Bitte um R&uuml;ckruf"</b> mit Ihrer Telefonnummer an uns zurück.<br> Wir werden uns dann umgeghend bei Ihnen melden		</em></td>	
			</tr>
		</tfoot>
	</table></body></html>';
	
	

	$empfaenger = $mail;
	$absender = "support@hypo-privat.com";
	$betreff = "Wilkommen bei Hypo Privat";
	// $antwortan = "ICH@testkarnickel.de";
	
	$header = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	
	$header .= "From: $absender\r\n";
	// $header .= "Reply-To: $antwortan\r\n";
	// $header .= "Cc: $cc\r\n"; // falls an CC gesendet werden soll
$header .= 'Bcc: support@hypo-privat.com' . "\r\n";
	$header .= "X-Mailer: PHP " . phpversion ();
	
	mail ( $empfaenger, $betreff, $mailtext, $header );
	
	return json_encode ( array (
			utf8_encode ( "success" ) 
	) );
	
	$strReturnhtml = "www.hypo-privat.com/index.html#cta";
}
//send_zahlung ( $db ,$anl_objekt, $anl_indexkey , $anl_zahltag )
function send_zahlung($db, $anl_indexkey, $HP_key, $anl_zahltag) {
	$sql = " SELECT distinct user.*,  anl.*
			FROM hp_user user 	left JOIN hp_anlage anl on (indexkey) = (anl_indexkey)
				where anl_objekt = '" . $anl_indexkey . "'
				and indexkey ='" . $HP_key . "'
				and anl_zahltag = substr('" . $anl_zahltag ."',1,16) 
				group by indexkey";
	
	// echo "hier userdata = ", $sql . "\n";
	$result = mysqli_query ( $db, $sql );
	while ( $row = mysqli_fetch_array ( $result ) ) {
		
		$indexkey = htmlentities ( $row ['indexkey'] );
		$titel = htmlentities ( $row ['titel'] );
		$vorname = htmlentities ( $row ['vorname'] );
		$name = htmlentities ( $row ['name'] );
		$mail = htmlentities ( $row ['mail'] );
		
		$anl_indexkey = htmlentities ( $row ['anl_indexkey'] );
		$anl_objekt = htmlentities ( $row ['anl_objekt'] );
		$anl_betrag = htmlentities ( $row ['anl_betrag'] );
		$anl_whrg = htmlentities ( $row ['anl_whrg'] );
		$anl_zahltag = htmlentities ( $row ['anl_zahltag'] );
		$anl_zins = htmlentities ( $row ['anl_zins'] );	
		$anl_zeit = htmlentities ( $row ['anl_zeit'] );
		$anl_typ = htmlentities ( $row ['anl_typ'] );
		
	}
	
	if ( $anl_typ === 'rend' ){
		$anl_text = 'in ein Rendite Projekt  ';		
	} else {$anl_text = 'in ein privates Hypotheken Darlehen  ';};
	
	// echo $mail'];

	
	$mailtext = '<html><body>
			<table 	style="border: 2px solid black; background-color: #FFFFE0; border-collapse: collapse; font-family: Georgia, Garamond, Serif; color: black;">
		<thead>
			<tr>
				<th colspan=2	style="width: 50%; font: bold 18px/1.1em Arial, Helvetica, Sans-Serif; text-shadow: 1px 1px 4px black; letter-spacing: 0.3em; background-color: #BDB76B; color: white;">
			Hypo-Privat	Zahlungsanweisung</th>
			</tr>
		</thead>
		<tbody style="font-style: normal;">

			<tr style="border: 1px solid black;">
				<td colspan=2>Sehr geehrter/e ' . $vorname . '  ' . $name . ', <br>
					Sie haben sich entschieden ' . $anl_betrag . ' ' . $anl_whrg . ' '  . $anl_text . ' zu investieren.<br> Projekt Nummer:' . $anl_indexkey .' Rendite/Zins ca. '.  $anl_zins .' % und einer Laufzeit von '. $anl_zeit . ' Monate <br>
					<br> Bitte &Uuml;berweisen sie bis sp&auml;testens '. 	$anl_zahltag . ' Ihre Investition auf folgendes Konto:
				</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
			<td>Empfänger</td>
			<td>Hypo Privat</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
				<td>IBAN :</td>
				<td>CH82 0483 5112 4849 6100 0</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
				<td>BIC / SWIFT</td>
				<td>CRESCHZZ80A</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
				<td>Verwendungszweck</td>
				<td>Projekt Nr. '.  $anl_indexkey . '</td>
			</tr>
			<tr style="background-color: #FFF0FB;">
				<td></td>
				<td>Kunden Nr.' . $indexkey .'</td>
			</tr>
		</tbody>
		<tfoot style="border: 1px solid black; background-color: white;">
			<tr>
				<td colspan="4" class="rounded-foot-left"><em>Sollten Sie
						Fragen zu Ihrem Investment haben oder keine Investition getätigt
						haben,<br> senden sie diese E-Mail bitte mit dem Vermerk <b>
							"ANLAGE STORNIERT"</b> zurück.<br> Wir m&uuml;ssen dann das
						Nutzerkonto <b>'. $mail  . ' Nummer '. $indexkey . '</b> von der weiteren Teilnahme
						ausschliessen.
				</em></td>

			</tr>
		</tfoot>
	</table></body></html>';
	
	$empfaenger = $mail;
	$absender = "support@hypo-privat.com";
	$betreff = "Ihr Investment bei Hypo Privat";
	// $antwortan = "ICH@testkarnickel.de";
	
	$header = "MIME-Version: 1.0\r\n";
	$header .= "Content-type: text/html; charset=iso-8859-1\r\n";
	
	$header .= "From: $absender\r\n";
	// $header .= "Reply-To: $antwortan\r\n";
	// $header .= "Cc: $cc\r\n"; // falls an CC gesendet werden soll
$header .= 'Bcc: support@hypo-privat.com' . "\r\n";
	$header .= "X-Mailer: PHP " . phpversion ();
	
	mail ( $empfaenger, $betreff, $mailtext, $header );
	
	return json_encode ( array (
			utf8_encode ( "success" ) 
	) );
	$strReturnhtml = "www.hypo-privat.com/index.html#cta";
}

?>




