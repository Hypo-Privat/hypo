var form = document.querySelectorAll('#Renditeobjekt');

var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');

/*
 * SELECT `rend_indexkey`, `rend_user`, `rend_insertdate`, `rend_name`, `rend_typ`, `rend_wert`, 
 * `rend_wert_whrg`, `rend_eigenkapital`, `rend_fremdkapital`, `rend_founding`, `rend_zins`, `rend_text`, 
 * `rend_strasse`, `rend_hausnr`, `rend_plz`, `rend_ort`, `rend_land`, `rend_datumbis`, `rend_sicherheit` FROM `hp_renditeobjekt` WHERE 1
 * 
 */

// alert("HP_Key" + HP_Key);
if (HP_Key > "1") {

	$('.Welcome').html(
			'Guten Tag ' + HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname);
} else {
	$('.Welcome')
			.html(
					'<font color="red">Guten Tag ! <a href="index.html#cta">Bitte melden Sie sich erst an oder Registrieren Sie sich. </a></font>');
}

// initialisieren FORM upload tables
var FormHead = ('<form method="POST" enctype="multipart/form-data"	action="php/uploadFile.php">'
		+ '<input type="hidden" name="HP_Key" value="' + HP_Key + '"> ');

var FileUpFormFoot = ('<input class="button  small" name="userfile" type="file">'
		+ '<input class="button special small" type="submit" 		name="submit" value="Speichern">		');

var DocText = ('<b>Wert Gutachten</b><br>');
upload = (DocText
		+ '<input type="hidden" name="FileName" value="RenditeGutachten"> '
		+ '<input type="hidden" name="DocGroup" value="P">' + FileUpFormFoot

);

//$('.Rend_schaetzung').html(upload);

function checkRendite() {

	var func = document.getElementById("func").value;

	// Rendektdaten

	var Rend_name = document.getElementById("Rend_name").value;
	var Rend_typ = document.getElementById("Rend_typ").value;
	var Rend_wert = document.getElementById("Rend_wert").value;
	var Rend_wert_whrg = document.getElementById("Rend_wert_whrg").value;
	var Rend_eigenkapital = document.getElementById("Rend_eigenkapital").value;
	var Rend_fremdkapital = document.getElementById("Rend_fremdkapital").value;
	var Rend_founding = document.getElementById("Rend_founding").value;
	var Rend_zins = document.getElementById("Rend_zins").value;

	var Rend_text = document.getElementById("Rend_text").value;

	var Rend_strasse = document.getElementById("Rend_strasse").value;
	var Rend_hausnr = document.getElementById("Rend_hausnr").value;
	var Rend_plz = document.getElementById("Rend_plz").value;
	var Rend_ort = document.getElementById("Rend_ort").value;
	var Rend_land = document.getElementById("Rend_land").value;

	var Rend_datum = document.getElementById("Rend_datum").value;
	var Rend_sicherheit = document.getElementById("Rend_sicherheit").value;

	dataString = encodeURI("function=" + func + "&HP_Key=" + HP_Key
			+ "&Rend_name=" + Rend_name + "&Rend_typ=" + Rend_typ + "&Rend_wert=" + Rend_wert
			
			+ "&Rend_wert_whrg=" + Rend_wert_whrg  + "&Rend_eigenkapital=" + Rend_eigenkapital
			+ "&Rend_fremdkapital=" + Rend_fremdkapital + "&Rend_founding=" + Rend_founding
			
			+ "&Rend_zins=" + Rend_zins + "&Rend_whrg=" + Rend_wert + "&Rend_text=" + Rend_text 
			+ "&Rend_strasse=" + Rend_strasse 	+ "&Rend_hausnr=" + Rend_hausnr + "&Rend_plz=" + Rend_plz
			+ "&Rend_ort=" + Rend_ort + "&Rend_land=" + Rend_land
			+ "&Rend_datum=" + Rend_datum + "&Rend_sicherheit=" + Rend_sicherheit
			
	
	
	);
	 alert( dataString);

	$.ajax({
		type : "get",
		url : "php/hypoRendite.php",
		data : dataString,
		contentType : "application/json", // charset=utf-8", // Set
		dataType : 'json',
		jsonCallback : 'getJson',
		async : false,
		success : function() {
			// alert("success : function() =");
			window.location = "UserProfil.html";

		},
		error : function() {
			alert("error: function=" + func);
			window.location = "index.html";

		}
	});

}