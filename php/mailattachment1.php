<?php
//http://phpforum.de/archiv_10903_Bilder@in@Php@Mail@uebermitteln_anzeigen.html
//Du willst wissen wie das geht? Nun, es gibt für PHP bestimmte MIME Mail Klassen dafür, die habe ich aber noch nicht getestet. Es geht auch anderst, z. B. mit der mail() Funktion:

// create a boundary
$boundary = "oberAFFENcool-" . time();
//$boundary .= $$; // didn't dig $$ equivalent in PHP ( process-id )
$boundary .= "xoxoxoxoxo";
$boundary .= time() . "-oberAFFENcool";

$charset = "iso-8859-1";

//load the attachment from disk
$attach_file_name = "jam-session.jpg";
$handle = fopen($attach_file_name, "r");
$attach_content = fread($handle, filesize($attach_file_name));
fclose($handle);

$themessage = "this is my message baby!";

$to = "gert.dorn@a-t-c.ch";
$subject = "from php mail";
$xtra = "From: ab@sender.de (Absender)\n";
$xtra .= "X-Mailer: PHP ". phpversion() . "\n";
$xtra .= "X-BrightmanDigIt: Dig this cool Peter Brightman PHP skript\n";
$xtra .= "MIME-Version: 1.0\n";
$xtra .= "Content-Transfer-Encoding: 8bit\n";
$xtra .= "Content-Type: multipart/mixed; boundary=\"". $boundary . "\"\n\n";
$xtra .= "--" . $boundary . "\n";
$xtra .= "Content-Type: text/plain; charset=\"" . $charset . "\"\n";
$xtra .= "Content-Transfer-Encoding: 7bit";

$message = $themessage . "\n\n";
$message .= "--" . $boundary . "\n";
$message .= "Content-Type: image/png; name=\"" . $attach_file_name . "\"\n";
$message .= "Content-Transfer-Encoding: base64\n";
$message .= "Content-Disposition: attachment; filename=\"" . $attach_file_name . "\"\n\n";

//encode the attachment with BASE64
$attach = chunk_split(base64_encode($attach_content));
$message .= $attach;
$message .= "\n--" . $boundary . "--\n";

mail($to, $subject, $message, $xtra);

//Sendet als body den inhalt von $themessage als plain text und ein image als attachment welches von disk geladen wird. Dig it.

?>
