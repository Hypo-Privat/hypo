// Formdaten an PHP-Datei senden http://codetheory.in/html5-form-validation-on-javascript-submission/
//var form = document.querySelector('#register');



function chkFormular() {
	// http://www.formws.onlex.de/javascript-ecke/formularueberpruefung.html

	var f = document.registerform;
	// Formularname
	var fehler = "";

	if (!f.agb.checked || !f.wiederruf.checked) {
		fehler += "Bitte Wiederrufsbelehrung und AGB akzeptieren\n";
	} else {

		// alert("else check agb = ");
		var windowname = document.getElementById("winName").value;
		var func = document.getElementById("func").value;
		var titel = document.getElementById("titel").value;
		var name = document.getElementById("name").value;
		var vorname = document.getElementById("vorname").value;

		var strasse = document.getElementById("strasse").value;
		var hausnr = document.getElementById("hausnr").value;
		var plz = document.getElementById("plz").value;
		var ort = document.getElementById("ort").value;
		var sprache = document.getElementById("sprache").value;
		var land = document.getElementById("land").value;

		var mail = document.getElementById("mail").value;
		var tel = document.getElementById("tel").value;

		var wiederruf = document.getElementById("wiederruf").value;
		var agb = document.getElementById("agb").value;
		var news = document.getElementById("news").value;


		dataString = encodeURI("function=" + func + "&titel=" + titel
				+ "&name=" + name + "&vorname=" + vorname + "&strasse="
				+ strasse + "&hausnr=" + hausnr + "&plz=" + plz + "&ort=" + ort
				+ "&land=" + land + "&sprache=" + sprache + "&mail=" + mail
				+ "&tel=" + tel + "&wiederruf=" + wiederruf + "&agb=" + agb + "&news=" + news);
		// alert(windowname);
		// alert(dataString);

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
				window.close('Register');
				window.location = "dankeContact.html";

			},
			error : function() {
				// var objData = jQuery.parseJSON(data);
				// var result = (objData .status +':' + objData .message);
				alert("error: register.js = php/hypoUser.php");
				window.close('Register');
				window.location = "error.html";
				

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
