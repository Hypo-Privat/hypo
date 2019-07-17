var _paq = _paq || [];
_paq.push([ 'trackPageView' ]);
_paq.push([ 'enableLinkTracking' ]);
(function() {
	var u = "//hypo-privat.com/piwik/";
	_paq.push([ 'setTrackerUrl', u + 'piwik.php' ]);
	_paq.push([ 'setSiteId', '1' ]);
	var d = document, g = d.createElement('script'), s = d
			.getElementsByTagName('script')[0];
	g.type = 'text/javascript';
	g.async = true;
	g.defer = true;
	g.src = u + 'piwik.js';
	s.parentNode.insertBefore(g, s);
})();

var browser_language;
var HP_Index = window.localStorage.getItem('HP_Index');

browser_language = navigator.language;
browser_language = browser_language.substr(0, 2);
window.localStorage.setItem('Browser_Sprache', browser_language);
// || HP_Index != '185.117.169.61' || HP_Index != 'localhost'
if (HP_Index == '127.0.0.1'  || HP_Index == 'hypo-privat.com' || HP_Index == 'localhost'){ 
	window.localStorage.setItem('Browser_Sprache', browser_language)
	} else {window.localStorage.setItem('Browser_Sprache', 'x')}
var offsetx = 50
var offsety = 0
function InfoBoxAusblenden() {
	document.getElementById('InfoBox').style.visibility = "hidden";
}

function InfoBoxAnzeigen(e, Inhalte, offsetX, offsetY) {
	if (offsetX) {
		offsetx = offsetX;
	} else {
		offsetx = 50;
	}
	if (offsetY) {
		offsety = offsetY;
	} else {
		offsety = 0;
	}
	var PositionX = 0;
	var PositionY = 0;
	if (!e)
		var e = window.event;
	if (e.pageX || e.pageY) {
		PositionX = e.pageX;
		PositionY = e.pageY;
	} else if (e.clientX || e.clientY) {
		PositionX = e.clientX + document.body.scrollLeft;
		PositionY = e.clientY + document.body.scrollTop;
	}
	document.getElementById("BoxInhalte").innerHTML = Inhalte;
	document.getElementById('InfoBox').style.left = (PositionX + offsetx)
			+ "px";
	document.getElementById('InfoBox').style.top = (PositionY + offsety) + "px";
	document.getElementById('InfoBox').style.visibility = "visible";
}
function language(lang) {
	alert("sprache = " + lang);
	window.localStorage.setItem('Browser_Sprache', lang);
	window.location = lang + "/index.html";
}
function popWIN(mylink, windowname) {
	if (!window.focus)
		return true;
	var href;
	if (typeof (mylink) == 'string')
		href = mylink;
	else
		href = mylink.href;
	switch (windowname) {
	case "AGB":
		window.open(href, windowname,
				'width=1000,height=800, top=200 , left=500,  ,scrollbars=yes');
		break;
	case "Buerge":
		window.open(href, windowname,
				'width=1000,height=800, top=200 , left=500,  ,scrollbars=yes');
		break;
	case "Objekt":
		window.open(href, windowname,
				'width=1000,height=800, top=200 , left=500,  ,scrollbars=yes');
		break;
	default:
		window.open(href, windowname,
				'width=600,height=700, top=200 , left=200,  ,scrollbars=yes');
		break;
	}
	return false;
}
$(function() {
	$(".accordion").accordion({
		collapsible : true,
		heightStyle : "content"
	});
});
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Login = window.localStorage.getItem('HP_Login');
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');
var HP_Sprache = window.localStorage.getItem('HP_Sprache');
var Browser_Sprache = window.localStorage.getItem('Browser_Sprache');
function logout() {
	window.localStorage.setItem('HP_Mail', '');
	window.localStorage.setItem('HP_Key', '');
	window.localStorage.setItem('HP_Vorname', '');
	window.localStorage.setItem('HP_Nachname', '');
	window.localStorage.setItem('HP_Login', 'false');
	window.localStorage.clear();
	window.location = "index.html";
}
function errorMSG(MSG) {
	alert(MSG);
	$('.errorMSG').html(MSG);
}
if (HP_Login === 'true') {
	$('.header-menue')
			.html(
					'<h1><a href="../index.html">Hypo-Privat</a></h1>  '
							+ '<nav id="nav"> '
							+ '<ul><li><a href="../index.html">Home</a></li>'
							+ '<li><center><a href="../auction.html"> <img src="images/auction.jpg" name="auction" width="20" height20" border="1"> Live Auktion</a></center></li>'
							+ '<li><a href="../rendite-auction.html">Rendite Objekte</a></li>'
							+ '<li><a href="../UserProfil.html">Mein Profil</a></li>'
							+ '<li><a href="../faq.html">FAQ</a></li>'
							+ '<li><a href="../#" class="icon fa-angle-down">Menue</a>'
							+ '<ul><li><a href="../auction.html">Live Auktion</a></li>'
							+ '<li><a href="../rendite-auction.html">Rendite Objekte</a></li>'
							+ '	<li><a href="../UserProfil.html">Mein Profil</a></li>'
							+ '<li>	<a href="../#">Finanzierung</a><ul>'
							+ '<li><a href="../info-darlehen.html">Darlehen beantragen</a></li>'
							+ '<li><a href="../rendite-objekt.html">Rendite Objekte erfassen</a></li></ul></li>'
							+ '<li>	<a href="../#">Anleger</a><ul>'
							+ '<li><a href="../info-investor.html">Info Anleger</a></li>'
							+ '<li><a href="../info-rendite.html">Info Rendite Objekte</a></li></ul></li>'
							+ '<li><a href="../feedback.html">Kunden Feedback</a></li>'
							+ '<li><a href="../index.html#cta"">Anmelden</a></li>'
							+ '<li>	<a href="../#">Allgemeines</a><ul>'
							+ '<li><a href="../jobs.html">Karriere</a></li>'
							+ '<li><a href="../faq.html">Fragen und Antworten</a></li>'
							+ '<li><a href="../contact.html">Kontakt</a></li>'
							+ '<li><a href="../agb.html">AGB</a></li>'
							+ '<li><a href="../datenschutz.html">Datenschutz</a></li>'
							+ '<li><a href="../impressum.html">Impressum</a></li></ul></li>'
							+ '</ul></nav>');
} else {
	$('.header-menue')
			.html(
					'<h1><a href="../index.html">Hypo-Privat</a></h1>  '
							+ '<nav id="nav"> '
							+ '<ul><li><a href="../index.html">Home</a></li>'
							+ '<li><center><a href="../auction.html"> <img src="images/auction.jpg" name="auction" width="20" height20" border="1"> Live Auktion</a></center></li>'
							+ '<li><a href="../rendite-auction.html">Rendite Objekte</a></li>'
							+ '<li><a href="../index.html#cta"">Anmelden</a></li>'
							+ '<li><a href="../#" class="icon fa-angle-down">Menue</a>'
							+ '<ul><li><a href="../index.html#cta"">Anmelden</a></li>'
							+ '	<li><a href="../auction.html">Live Auktion</a></li>'
							+ '<li><a href="../rendite-auction.html">Rendite Objekte</a></li>'
							+ '<li>	<a href="../#">Finanzierung</a><ul>'
							+ '<li><a href="../info-darlehen.html">Darlehen beantragen</a></li>'
							+ '<li><a href="../rendite-objekt.html">Rendite Objekte erfassen</a></li></ul></li>'
							+ '<li>	<a href="../#">Anleger</a><ul>'
							+ '<li><a href="../info-investor.html">Info Anleger</a></li>'
							+ '<li><a href="../info-rendite.html">Info Rendite Objekte</a></li></ul></li>'
							+ '<li><a href="../feedback.html">Kunden Feedback</a></li>'
							+ '<li>	<a href="../#">Allgemeines</a><ul>'
							+ '<li><a href="../jobs.html">Karriere</a></li>'
							+ '<li><a href="../faq.html">Fragen und Antworten</a></li>'
							+ '<li><a href="../contact.html">Kontakt</a></li>'
							+ '<li><a href="../agb.html">AGB</a></li>'
							+ '<li><a href="../datenschutz.html">Datenschutz</a></li>'
							+ '<li><a href="../impressum.html">Impressum</a></li>'
							+ '</ul><li></ul></nav>');
}

$('.team')
		.html(
				'<div id="team" class="table-wrapper"></div>'
						+ '<table><tbody><tr>	<!-- css  http://staticfloat.com/csshtmlxml/runde-kreisbilder-mit-css3/ -->'
							+ '<td><div class="circular bird"><img src="images/gert.png"></div><p>Gert Dorn</p></td>'
						+ '<td><div class="circular bird"><img src="images/nick.jpg"></div><p>Nick Baenninger</p></td>'
						+ '</tr>	</tbody></table></div>');

$('.video').html(
		'<div id="team" class="table-wrapper"></div>'
				+ '<table><tbody><tr>	<!-- css  http://staticfloat.com/csshtmlxml/runde-kreisbilder-mit-css3/ -->'
				+ '<td><div class="circular bird"><video style="width: 100.1%; height: 100.1%;"'
				+'		src="../video/Silvia1.MP4" type="../video/mp4"'
				+'		poster="../video/Silvia1.png" autobuffer autoplay ></div></td>'
			
				+ '</tr>	</tbody></table></div>');


$('.soziale-menue')
		.html(
				'<div class="row">'
						+ '	<div class="4u 12u(narrower)"><h5>Investoren</h5>'
						+ '	<ul><li><a href="../info-investor.html">Information f&uumlr Anleger</a></li>'
						+ '		<li><a href="../auction.html">Live Auction</a></li>'
						+ '		<li><a href="../rendite-auction.html">Rendite Objekte</a></li>'
						+ '		<li><a href="../info-rendite.html">Info Rendite Objekte</a></li>	'
						+ '		<li><a href="../UserProfil.html">Ihre Anlagen</a></li>	</ul></div>'
						+ '	<div class="4u 12u(narrower)">	<h5>Darlehensnehmer</h5>'
						+ '	<ul><li><a href="../info-darlehen.html">Kredit beantragen</a></li>'
						+ '		<li><a href="../buerge.html">Infos f&uumlr B&uumlrgen</a></li>'
						+ '		<li><a href="../rendite-objekt.html">Rendite Objekte erfassen</a></li>'
						+ '		<li><a href="../UserProfil.html">Ihre Kredite</a></li>	</ul>	</div>'
						+ '	<div class="4u 12u(narrower)"><h5>Rechtliches</h5>'
						+ '		<ul><li><a href="../jobs.html">Karriere</a></li>'
						+ '			<li><a href="../impressum.html">Impressum</a></li>'
						+ '			<li><a href="../datenschutz.html">Datenschutz</a></li>'
						+ '			<li><a href="../agb.html">AGB</a></li>'
					//	+ '			<li><a href="../team.html">Unser Team</a></li></ul></div>
					+'</div><br>'
						+ '<ul class="icons">'
						+ '<li><a href="../#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>'
						+ '<li><a href="../#" class="icon fa-facebook"><span	class="label">Facebook</span></a></li>'
						+ '<li><a href="../#" class="icon fa-instagram"><span	class="label">Instagram</span></a></li>'
						+ '<li><a href="../#" class="icon fa-github"><span class="label">Github</span></a></li>'
						+ '<li><a href="../#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>'
						+ '<li><a href="../#" class="icon fa-google-plus"><span class="label">Google+</span></a></li>'
						+ '</ul> <ul class="copyright">	<li>&copy; Untitled. All rights reserved.</li>'
						+ '<li>Design: Gert Dorn 2017</li></ul>'
						+ '<noscript><p><img src="//hypo-privat.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>');
$('.hypo-menue')
		.html(
				'<ulf>'
						+ '<lif><a href="../agb.html" class="round green">AGB<span class="round">Allgemeine Geschï¿½fts bedingungen</span></a></lif><lif></lif>'
						+ '<lif><a href="../impressum.html" class="round red">Impress<span class="round">Informationen zum Unternehmen</span></a></lif><lif></lif>'
						+ '<lif><a href="../contact.html" class="round yellow">Kontakt<span class="round">Eine Nachricht senden. </span></a></lif><lif></lif>'
						+ '<lif><a href="../#" class="round red">Demo<span class="round">Machen Sie eine Demo tour.</span></a></lif><lif></lif>'
						+ '<lif><a href="../#" class="round green">Demo<span class="round">Machen Sie eine Demo tour.</span></a></lif><lif></lif>'
						+ '</ulf>');