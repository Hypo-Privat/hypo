/*
UsereKey			12345	
UserVorname	Gert	
UserNachname	Dorn	
UserObjektStr	Winterfeldtstrasse 79	
UserObjektId	12345-o1	
UserDarlehenId	12345-d1
Status usw. 
 */

var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');

var HP_ObjektId = window.localStorage.getItem('HP_ObjektId');
var HP_ObjektStr = window.localStorage.getItem('HP_ObjektStr');
var HP_DarlehenId = window.localStorage.getItem('HP_DarlehenId');
var HP_DarlehenBetrag = window.localStorage.getItem('HP_DarlehenBetrag');

var UserData = ('<b>Antragsteller</b> ' + HP_Vorname + ' ' + HP_Nachname + ' '	+ HP_Mail + ' ');
var DarlehenData = (' <b>Darlehen</b> ' + HP_DarlehenId + ' Betrag ' + HP_DarlehenBetrag);
var ObjektData = (' <b>Objekt</b>  ' + HP_ObjektId + ' ' + HP_ObjektStr + ' ');

// alert(" UserData " + UserData + ' Darlehen ' + DarlehenData + ' Objekt ' +
// ObjektData) ;

// $(ActorData).appendTo('#ActorAllHead');

$('.headCheckDoc').html(
		'<h2>Checkliste Unterlagen</h2> <h4> ' + UserData + DarlehenData
				+ ObjektData + '</h4>');

// einlesen welceh Dokumente bereits vom Antragsteller eingeliefert wurden
// Status der ueberprÃ¼fing ausgeben.

var form = document.querySelector('#kontakt');

function kontaktmail() {

	// alert("kontaktmail = ");

	var func = document.getElementById("func").value;
	var titel = document.getElementById("titel").value;
	var name = document.getElementById("name").value;
	var vorname = document.getElementById("vorname").value;

	var sprache = document.getElementById("sprache").value;

	var mail = document.getElementById("mail").value;
	var tel = document.getElementById("tel").value;
	var message = document.getElementById("message").value;

	// alert("function=" + func + "&titel=" + titel + "&name=" + name +
	// "&vorname="
	// + vorname + "&sprache=" + sprache + "&mail=" + mail + "&tel=" + tel +
	// "&message=" + message);

	$.ajax({
		type : "get",
		url : "php/hypoUser.php",
		data : "function=" + func + "&titel=" + titel + "&name=" + name
				+ "&vorname=" + vorname + "&sprache=" + sprache + "&mail="
				+ mail + "&tel=" + tel + "&message=" + message,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
			    async : false,
		success : function() {
			// alert("success : function() ="); Danke fÃ¼r ihre Nachricht !
			window.location.assign = "danke.html";

		},
		error : function() {
			// alert("error: function() = ");
			window.location.assign = "index.html#cta";
		}
	});
	// alert('form submitted');
	// }, false);

}

function checkLen() {
	maxLen = 480;
	var txt = document.forms[0].message.value;
	if (txt.length > maxLen) {
		alert("Bitte maximal " + maxLen + " Zeichen eingeben!");
		document.forms[0].message.value = txt.substring(0, maxLen);
		document.forms[0].zaehler.value = 0;
	} else {
		document.forms[0].zaehler.value = maxLen - txt.length;
	}
}
