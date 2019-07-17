//accordion Slider https://jqueryui.com/accordion/ 
//hier als Class da mehrfach verwendet im der seite
/*

$(function() {
	$(".accordion").accordion({
		collapsible : true,
		heightStyle : "content"

	});
});
*/

// einlesen der UserDaten
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');

$(document)
		.ready(
				function() {
					// https://xuad.net/artikel/vom-einfachen-ajax-request-zum-komplexen-objektaustausch-mit-json-mittels-jquery/
					var PersData = (HP_Titel + ' ' + HP_Vorname + ' '
							+ HP_Nachname + ' - <b>Kundennummer</b> - ' + HP_Key);
					
					$('.Welcome')
							.html(	'<h2>Fragen und Antworten</h2>'
									+ 'Hier finden Sie eine Zusammenstellung der h&aumlufigsten Fragen und Antworten.<br>' 
									+'Gerne k&oumlnnen Sie uns auch direkt  <a href="contact.html"  onClick="return popWIN(this, Buerge )">per Mail</a> kontaktieren.'
							);
				});
