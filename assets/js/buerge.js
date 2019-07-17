// Formdaten an PHP-Datei senden http://codetheory.in/html5-form-validation-on-javascript-submission/

//var form = document.querySelector('#buerge');

var HP_Key = window.localStorage.getItem('HP_Key');
var HP_obj_indexkey = window.localStorage.getItem('HP_obj_indexkey');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');

// alert("HP_obj_indexkey" + HP_obj_indexkey);
if (HP_Key != null) {
	$('.Welcome').html(
			'Guten Tag ' + HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname);
} else {
	$('.Welcome')
			.html(
					'<font color="red">Guten Tag ! <a href="index.html#cta">Bitte melden Sie sich erst an oder Registrieren Sie sich. </a></font>');
}

/*
 * 
 * INSERT INTO `hp_buerge`(`darl_indexkey`, `brg_indexkey`, `usr_indexkey`,
 * `brg_datum_update`, `brg_titel`, `brg_vorname`, `brg_name`, `brg_datum_geb`,
 * `brg_strasse`, `brg_hausnr`, `brg_ort`, `brg_plz`, `brg_sprache`, `brg_land`,
 * `brg_tel_privat`, `brg_mail`, `brg_agb`, 
 * `brg_ausweis`, `brg_schufa`, `brg_lohn`) VALUES
 */

function chkBuerge() {
	// alert("function chkBuerge() ");
	// http://www.formws.onlex.de/javascript-ecke/formularueberpruefung.html

	var f = document.buergeform;
	// Formularname
	var fehler = "";

	if (!f.agb.checked || !f.wiederruf.checked) {
		fehler += "Bitte Wiederrufsbelehrung und AGB akzeptieren\n";
	} else {

		// alert("else check agb = ");

		var func = document.getElementById("func").value;
		var brg_titel = document.getElementById("titel").value;
		var brg_name = document.getElementById("name").value;
		var brg_vorname = document.getElementById("vorname").value;
		var brg_datum_geb = document.getElementById("datum_geb").value;
		// alert(" function=" + func);

		var brg_strasse = document.getElementById("strasse").value;
		var brg_hausnr = document.getElementById("hausnr").value;
		var brg_plz = document.getElementById("plz").value;
		var brg_ort = document.getElementById("ort").value;
		var brg_sprache = document.getElementById("sprache").value;
		var brg_land = document.getElementById("land").value;
		// alert(" land=" + brg_land);
		var brg_mail = document.getElementById("mail").value;
		var brg_tel = document.getElementById("tel").value;
		// alert("tel=" + brg_tel);
		var brg_einkommen = document.getElementById("einkommen").value;
		var brg_eink_whrg = document.getElementById("eink_whrg").value;
		// alert(" brg_eink_whrg=" + brg_eink_whrg);
		var brg_wiederruf = document.getElementById("wiederruf").value;
		var brg_agb = document.getElementById("agb").value;
		// alert(" brg_agb=" + brg_agb);

		dataString = encodeURI("function=" + func + "&usr_indexkey=" + HP_Key
				+ "&obj_indexkey=" + HP_obj_indexkey + "&brg_titel="
				+ brg_titel + "&brg_name=" + brg_name + "&brg_vorname="
				+ brg_vorname + "&brg_datum_geb=" + brg_datum_geb
				+ "&brg_strasse=" + brg_strasse + "&brg_hausnr=" + brg_hausnr
				+ "&brg_plz=" + brg_plz + "&brg_ort=" + brg_ort + "&brg_land="
				+ brg_land + "&brg_sprache=" + brg_sprache + "&brg_mail="
				+ brg_mail + "&brg_tel=" + brg_tel + "&brg_einkommen="
				+ brg_einkommen + "&brg_eink_whrg=" + brg_eink_whrg
				+ "&brg_wiederruf=" + brg_wiederruf + "&brg_agb=" + brg_agb);

		// /alert(dataString);

		$.ajax({
			type : "get",
			url : "../php/hypoUser.php",
			data : dataString,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
		    async : false,
			success : function() {
				//alert("success : function() =");
				window.close('Buerge');
				window.location.assign = "index.html#cta";

			},
			error : function() {
				alert("error: register.js = php/hypoUser.php");
				window.close('Buerge');
				window.location.assign = "index.html#cta";

			}
		});
		// alert('form submitted');
		// }, false);

	}

	// ausgebe Fehlermeldung
	if (fehler != "") {
		var fehlertext = "Die folgenden Felder wurden nicht vollst&aumlndig ausgef&uumlllt:\n\n";
		fehlertext += fehler;
		alert(fehlertext);
		return false;
	}

}
