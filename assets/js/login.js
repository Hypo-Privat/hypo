var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Index = window.localStorage.getItem('HP_Index');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');
var HP_Host = window.localStorage.getItem('HP_Host');

if (HP_Key > "1") {
	$('.Welcome').html(
			'Guten Tag ' + HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname);
} else {
	$('.Welcome')
			.html(
					' <font color="red">Guten Tag ! <a href="index.html#cta">Um zu investieren  bitte erst anmelden  oder registrieren. </a></font>');
}
var form = document.querySelectorAll('#login');
function checkLogin() {
	var func = document.getElementById("func").value;
	var mail = document.getElementById("mail").value;
	var pwd = document.getElementById("pwd").value;
	$
			.ajax({
				type : 'get',
				url : '../php/hypoUser.php',
				data : 'function=user_login_check&pwd=' + pwd + '&mail=' + mail,
				contentType : "application/json",
				dataType : 'json',
				jsonCallback : 'getJson',
				async : false,
				success : function(data) {
					$.each(data, function(counter, daten) {
						if (typeof (window.localStorage) != 'undefined') {
							window.localStorage.setItem('HP_Sprache',
									daten.sprache);
							window.localStorage.setItem('Browser_Sprache',
									daten.sprache);
							window.localStorage.setItem('HP_Key',
									daten.indexkey);
							window.localStorage.setItem('HP_Index',
									window.location.host);
							window.localStorage.setItem('HP_Host',
									window.location.hostname);
							window.localStorage.setItem('HP_Mail', daten.mail);
							window.localStorage
									.setItem('HP_Titel', daten.titel);
							window.localStorage.setItem('HP_Vorname',
									daten.vorname);
							window.localStorage.setItem('HP_Nachname',
									daten.name);
							window.localStorage
									.setItem('HP_Login', daten.login);
						} else {
							throw "window.localStorage, not defined";
						}
						window.location = "UserProfil.html";
					});
					window.location = "UserProfil.html";
				},
				error : function(data, req, status, err) {
					alert('Password oder E-Mail falsch ! Bitte erst anmelden  oder registrieren.');
					window.location = "index.html#cta";
				}
			});
}
var form = document.querySelectorAll('#sendPWform');
function sendPassword() {
	var func = document.getElementById("pfunc").value;
	var mail = document.getElementById("pmail").value;
	$.ajax({
		type : 'get',
		url : '../php/hypoUser.php',
		data : "function=" + func + "&mail=" + mail,
		contentType : "application/json",
		dataType : 'json',
		jsonCallback : 'getJson',
		async : false,
		success : function(data) {
			$.each(data, function(counter, daten) {
				window.location.assign = "index.html#cta";
			});
		},
		error : function(data, req, status, err) {
			alert('Fehler Passwortversand. ');
			window.location.assign = "index.html#cta";
		}
	});
}