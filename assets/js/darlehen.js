//http://www.strassenprogrammierer.de/mit-javascript-formulare-ueberpruefen_tipp_389.html

var form = document.querySelectorAll('#darlehenReq');

var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');
//alert("HP_Key" + HP_Key);
if(HP_Key > "1") {

	$('.Welcome').html( 'Guten Tag ' + HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname );	
} 	else  {
	$('.Welcome').html( '<font color="red">Guten Tag ! <a href="index.html#cta">Bitte melden Sie sich erst an oder Registrieren Sie sich. </a></font>');
	
	
}

function checkDarlehen() {
	var strFehler='';

	if (document.forms[0].Obj_strasse.value=="")

	  strFehler += "Feld Strasse ist leer -- ";
	
	if (document.forms[0].Obj_ort.value=="")

		  strFehler += "Feld Ort ist leer -- ";


	if (document.forms[0].Obj_plz.value.length<5)

	  strFehler += "Feld PLZ ist nicht korrekt ausgefüllt -- ";
	
	if (document.forms[0].Darl_wunsch.value.length<5)

		  strFehler += "Feld Wunschtermin ist nicht ausgefüllt -- ";

	if (strFehler.length>0) {

	  alert("Festgestellte Probleme: "+strFehler);

	  return(false);

	}
	

	var func = document.getElementById("func").value;
	
	var Darl_whrg = document.getElementById("Darl_whrg").value;
	var Darl_betrag = document.getElementById("Darl_betrag").value;
	var Darl_rate = document.getElementById("Darl_rate").value;
	var Darl_zeit = document.getElementById("Darl_zeit").value;
	var Darl_zins = document.getElementById("Darl_zins").value;
	var Darl_wunsch = document.getElementById("Darl_wunsch").value;
	var Darl_verwendung = document.getElementById("Darl_verwendung").value;
	var Darl_einkommen = document.getElementById("Darl_einkommen").value;


	// Objektdaten
	
	var Obj_whrg = document.getElementById("Obj_whrg").value;
	var Obj_wert = document.getElementById("Obj_wert").value;
	var Obj_strasse = document.getElementById("Obj_strasse").value;
	var Obj_hausnr = document.getElementById("Obj_hausnr").value;
	var Obj_plz = document.getElementById("Obj_plz").value;
	var Obj_ort = document.getElementById("Obj_ort").value;
	var Obj_land = document.getElementById("Obj_land").value;
	var Obj_baujahr = document.getElementById("Obj_baujahr").value;
	var Obj_text = document.getElementById("Obj_text").value;
	
	
	

		 dataString = encodeURI ( "function=" + func + "&HP_Key=" + HP_Key + "&Darl_verwendung=" + Darl_verwendung + "&Darl_einkommen="  + Darl_einkommen 
					+ "&Darl_whrg=" + Darl_whrg + "&Darl_betrag=" + Darl_betrag + "&Darl_rate=" + Darl_rate 
			        + "&Darl_zeit=" + Darl_zeit  + "&Darl_wunsch=" + Darl_wunsch + "&Darl_zins=" + Darl_zins
			        + "&Obj_baujahr=" + Obj_baujahr + "&Obj_whrg=" + Obj_whrg + "&Obj_wert=" + Obj_wert 
			        + "&Obj_strasse=" + Obj_strasse + "&Obj_hausnr=" + Obj_hausnr	+ "&Obj_plz=" + Obj_plz + "&Obj_ort=" + Obj_ort + "&Obj_land=" + Obj_land
			        + "&Obj_text=" + Obj_text
					);
		// alert( dataString);
		 
		 
		$.ajax({
			type : "get",
			url : "../php/hypoDarlehen.php",
			data : dataString ,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
		    async : false,
			success : function() {
				//alert("success : function() =");
			//	window.close('Darlehen');
				window.location = "UserProfil.html";
				
			},
			error : function() {
			//	window.close('Darlehen');
				alert("error: function=" + func );
				window.location = "index.html";
				
			}
		});
	
}