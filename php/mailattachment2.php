<?php
//http://phpforum.de/archiv_10903_Bilder@in@Php@Mail@uebermitteln_anzeigen.html
//Du willst wissen wie das geht? Nun, es gibt für PHP bestimmte MIME Mail Klassen dafür, die habe ich aber noch nicht getestet. Es geht auch anderst, z. B. mit der mail() Funktion:

$attach_file_name = "jam-session.jpg";
$file = $attach_file_name;
$file_size = filesize($file);
$handle = fopen($file, "r");
$content = fread($handle, $file_size);
fclose($handle);

$content = chunk_split(base64_encode($content));
$uid = md5(uniqid(time()));
$name = basename($file);

$eol = PHP_EOL;

$mail_to = "gert.dorn@a-t-c.ch";
// Basic headers
$header = "From: ".$from_name." <".$from_mail.">".$eol;
$header .= "Reply-To: ".$replyto.$eol;
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"";

// Put everything else in $message
$message = "--".$uid.$eol;
$message .= "Content-Type: text/html; charset=ISO-8859-1".$eol;
$message .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
$message .= $body.$eol;
$message .= "--".$uid.$eol;
$message .= "Content-Type: application/pdf; name=\"".$filename."\"".$eol;
$message .= "Content-Transfer-Encoding: base64".$eol;
$message .= "Content-Disposition: attachment; filename=\"".$filename."\"".$eol;
$message .= $content.$eol;
$message .= "--".$uid."--";

if (mail($mail_to, $subject, $message, $header))
{
	return "mail_success";
}
else
{
	return "mail_error";
}
?>
