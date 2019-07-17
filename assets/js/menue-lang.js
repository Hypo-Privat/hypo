//<!-- Piwik -->
//<script type="text/javascript">
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
// </script>
// <noscript><p><img src="//hypo-privat.com/piwik/piwik.php?idsite=1"
// style="border:0;" alt="" /></p></noscript>
// <!-- End Piwik Code -->

var browser_language;
browser_language = navigator.language;
browser_language = browser_language.substr(0, 2); 
window.localStorage.setItem('Browser_Sprache', browser_language);

var offsetx = 50
var offsety = 0
var language = 'de'

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
//	alert("sprache = " + lang);
	window.localStorage.setItem('Browser_Sprache', lang);
	window.location = lang +"/index.html";
	language = lang;
	switch (lang) {
	case "de":
		window.localStorage.setItem('Browser_Sprache', lang);
		
		break;
	case "en":
		window.localStorage.setItem('Browser_Sprache', en);
	
		break;

	case "fr":
		window.localStorage.setItem('Browser_Sprache', fr);
		
		break;

	default:
		window.localStorage.setItem('Browser_Sprache', de);
	
		break;
	}
	

}

/* Popup windows definieren */

function popWIN(mylink, windowname) {
	if (!window.focus)
		return true;
	var href;
	if (typeof (mylink) == 'string')
		href = mylink;
	else
		href = mylink.href;
	// alert(windowname);

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
// accordion Slider https://jqueryui.com/accordion/
// fuer FAQ und Profile notwendig
// ins HTML muss <script src="../assets/js/jquery-1.12.0-ui.js"></script>

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

// alert(" #HP_Mail " + HP_Mail);

function logout() {
	// Falls user sich unter anderer Id einloggen will

	window.localStorage.setItem('HP_Mail', '');
	window.localStorage.setItem('HP_Key', '');
	window.localStorage.setItem('HP_Vorname', '');
	window.localStorage.setItem('HP_Nachname', '');
	window.localStorage.setItem('HP_Login', 'false');

	window.localStorage.clear();
	window.location = "index.html";

	/*
	 * <section id="logout"><script src="../assets/js/logout.js"></script></section>
	 */
}

function errorMSG(MSG) {

	alert(MSG);

	$('.errorMSG').html(MSG);

}

if (HP_Login === 'true') {
	$('.header-menue')
			.html(
					'<h1><a href="../' + HP_Sprache + '/index.html">Hypo-Privat</a></h1>  '
							+ '<nav id="nav"> '

							+ '<ul><li><a href="../'+ HP_Sprache + '/index.html">Home</a></li>'
							+ '<li><center><a href="../'+ HP_Sprache + '/auction.html"> <img src="../images/auction.jpg" name="auction" width="20" height20" border="1"> Live Auktion</a></center></li>'
							+ '<li><a href="../../'+ HP_Sprache + '/rendite-auction.html">Rendite Objekte</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/UserProfil.html">Mein Profil</a></li>'
							+ '<li><a href="../faq.html">FAQ</a></li>'

							+ '<li><a href="../'+ HP_Sprache + '/#" class="icon fa-angle-down">Menue</a>'
							+ '<ul><li><a href="../'+ HP_Sprache + '/auction.html">Live Auktion</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/rendite-auction.html">Rendite Objekte</a></li>'
							+ '	<li><a href="../'+ HP_Sprache + '/UserProfil.html">Mein Profil</a></li>'

							+ '<li>	<a href="../'+ HP_Sprache + '/#">Finanzierung</a><ul>'

							+ '<li><a href="../'+ HP_Sprache + '/info-darlehen.html">Darlehen beantragen</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/rendite-objekt.html">Rendite Objekte erfassen</a></li></ul></li>'

							+ '<li>	<a href="../'+ HP_Sprache + '/#">Anleger</a><ul>'

							+ '<li><a href="../'+ HP_Sprache + '/info-investor.html">Info Anleger</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/info-rendite.html">Info Rendite Objekte</a></li></ul></li>'
							+ '<li><a href="../'+ HP_Sprache + '/feedback.html">Kunden Feedback</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/index.html#cta"">Anmelden</a></li>'
							+ '<li>	<a href="../'+ HP_Sprache + '/#">Allgemeines</a><ul>'
							+ '<li><a href="../'+ HP_Sprache + '/jobs.html">Karriere</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/faq.html">Fragen und Antworten</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/contact.html">Kontakt</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/agb.html">AGB</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/datenschutz.html">Datenschutz</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/impressum.html">Impressum</a></li></ul></li>'
							+ '</ul></nav>');

} else {
	 HP_Sprache = Browser_Sprache ;
	$('.header-menue')	
			.html(
					'<h1><a href="../'+ HP_Sprache + '/index.html">Hypo-Privat</a></h1>  '
							+ '<nav id="nav"> '

							+ '<ul><li><a href="../'+ HP_Sprache + '/index.html">Home</a></li>'
							+ '<li><center><a href="../'+ HP_Sprache + '/auction.html"> <img src="../images/auction.jpg" name="auction" width="20" height20" border="1"> Live Auktion</a></center></li>'
							+ '<li><a href="../'+ HP_Sprache + '/rendite-auction.html">Rendite Objekte</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/index.html#cta"">Anmelden</a></li>'

							+ '<li><a href="../'+ HP_Sprache + '/#" class="icon fa-angle-down">Menue</a>'
							+ '<ul><li><a href="../'+ HP_Sprache + '/index.html#cta"">Anmelden</a></li>'
							+ '	<li><a href="../'+ HP_Sprache + '/auction.html">Live Auktion</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/rendite-auction.html">Rendite Objekte</a></li>'

							+ '<li>	<a href="../'+ HP_Sprache + '/#">Finanzierung</a><ul>'

							+ '<li><a href="../'+ HP_Sprache + '/info-darlehen.html">Darlehen beantragen</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/rendite-objekt.html">Rendite Objekte erfassen</a></li></ul></li>'

							+ '<li>	<a href="../'+ HP_Sprache + '/#">Anleger</a><ul>'

							+ '<li><a href="../'+ HP_Sprache + '/info-investor.html">Info Anleger</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/info-rendite.html">Info Rendite Objekte</a></li></ul></li>'
							+ '<li><a href="../'+ HP_Sprache + '/feedback.html">Kunden Feedback</a></li>'

							+ '<li>	<a href="../'+ HP_Sprache + '/#">Allgemeines</a><ul>'
							+ '<li><a href="../'+ HP_Sprache + '/jobs.html">Karriere</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/faq.html">Fragen und Antworten</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/contact.html">Kontakt</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/agb.html">AGB</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/datenschutz.html">Datenschutz</a></li>'
							+ '<li><a href="../'+ HP_Sprache + '/impressum.html">Impressum</a></li>'
							+ '</ul><li></ul></nav>');

}

$('.team')
		.html(
				'<div id="team" class="table-wrapper"></div>'
						+ '<table><tbody><tr>	<!-- css  http://staticfloat.com/csshtmlxml/runde-kreisbilder-mit-css3/ -->'
						+ '<td><div class="circular bird"><img src="images/stan.png"></div><p>Stanislaus Tuchacheck</p></td>'

						+ '<td><div class="circular bird"><img src="images/gert.png"></div><p>Gert Dorn</p></td>'

						+ '<td><div class="circular bird"><img src="images/nick.jpg"></div><p>Nick Baenninger</p></td>'
						+ '</tr>	</tbody></table></div>');

/*
 * + '<div class="row">' + ' <div class="4u 12u(narrower)"><h5>Investoren</h5>' + '
 * <ul><li><a href="../info-investor.html">Information f&uumlr Anleger</a></li>' + '
 * <li><a href="../auction.html">Live Auction</a></li>' + ' <li><a
 * href="../UserProfil.html">Ihre Anlagen</a></li> </ul></div>' + ' <div
 * class="4u 12u(narrower)"> <h5>Darlehensnehmer</h5>' + ' <ul><li><a
 * href="../info-darlehen.html">Kredit beantragen</a></li> + ' <li><a
 * href="../buerge.html">Infos f&uumlr B&uumlregen</a></li> + ' <li><a
 * href="../immobilie.html">Immobilie erfassen</a></li> + ' <li><a
 * href="../UserProfil.html">Ihre Kredite</a></li> </ul> </div>' + ' <div
 * class="4u 12u(narrower)"><h5>Rechtliches</h5>' + ' <ul><li><a
 * href="../impressum.html">Impressum</a></li> + ' <li><a
 * href="../datenschutz.html">Datenschutz</a></li> + ' <li><a
 * href="../agb.html">AGB</a></li> + ' <li><a href="../team.html">Unser Team</a></li></ul></div></div>'
 */

$('.soziale-menue')
		.html(
				/*
				 * '<div id="team" class="table-wrapper">' + '<table><tbody><tr>
				 * <!-- css
				 * http://staticfloat.com/csshtmlxml/runde-kreisbilder-mit-css3/
				 * -->' + '<td><div class="circular bird"><img
				 * src="images/stan.png"></div><p>Stanislaus Tuchacheck</p></td>' + '<td><div
				 * class="circular bird"><img src="images/gert.png"></div><p>Gert
				 * Dorn</p></td>' + '<td><div class="circular bird"><img
				 * src="images/nick.jpg"></div><p>Nick Baenninger</p></td>' + '</tr></tbody></table></div>'
				 */'<div class="row">'
						+ '	<div class="4u 12u(narrower)"><h5>Investoren</h5>'
						+ '	<ul><li><a href="../'+ HP_Sprache + '/info-investor.html">Information f&uumlr Anleger</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/auction.html">Live Auction</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/rendite-auction.html">Rendite Objekte</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/info-rendite.html">Info Rendite Objekte</a></li>	'
						+ '		<li><a href="../'+ HP_Sprache + '/UserProfil.html">Ihre Anlagen</a></li>	</ul></div>'

						+ '	<div class="4u 12u(narrower)">	<h5>Darlehensnehmer</h5>'
						+ '	<ul><li><a href="../'+ HP_Sprache + '/info-darlehen.html">Kredit beantragen</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/buerge.html">Infos f&uumlr B&uumlrgen</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/rendite-objekt.html">Rendite Objekte erfassen</a></li>'
						+ '		<li><a href="../'+ HP_Sprache + '/UserProfil.html">Ihre Kredite</a></li>	</ul>	</div>'

						+ '	<div class="4u 12u(narrower)"><h5>Rechtliches</h5>'
						+ '		<ul><li><a href="../'+ HP_Sprache + '/jobs.html">Karriere</a></li>'
						+ '			<li><a href="../'+ HP_Sprache + '/impressum.html">Impressum</a></li>'
						+ '			<li><a href="../'+ HP_Sprache + '/datenschutz.html">Datenschutz</a></li>'
						+ '			<li><a href="../'+ HP_Sprache + '/agb.html">AGB</a></li>'
						+ '			<li><a href="../'+ HP_Sprache + '/team.html">Unser Team</a></li></ul></div></div>'

						+ '<ul class="icons">'
						+ '<li><a href="../#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>'
						+ '<li><a href="../#" class="icon fa-facebook"><span	class="label">Facebook</span></a></li>'
						+ '<li><a href="../#" class="icon fa-instagram"><span	class="label">Instagram</span></a></li>'
						+ '<li><a href="../#" class="icon fa-github"><span class="label">Github</span></a></li>'
						+ '<li><a href="../#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>'
						+ '<li><a href="../#" class="icon fa-google-plus"><span class="label">Google+</span></a></li>'
						+ '</ul> <ul class="copyright">	<li>&copy; Untitled. All rights reserved.</li>'
						+ '<li>Design: Gert Dorn 2016</li></ul>'
						+ '<noscript><p><img src="//hypo-privat.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>');

/*
 * $('.soziale-menue') .html( '<ul class="icons">' + '<li><a href="../#"
 * class="icon fa-twitter"><span class="label">Twitter</span></a></li>' + '<li><a
 * href="../#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>' + '<li><a
 * href="../#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>' + '<li><a
 * href="../#" class="icon fa-github"><span class="label">Github</span></a></li>' + '<li><a
 * href="../#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>' + '<li><a
 * href="../#" class="icon fa-google-plus"><span class="label">Google+</span></a></li>' + '</ul>
 * <ul class="copyright"> <li>&copy; Untitled. All rights reserved.</li>' + '<li>Design:
 * <a href="../http://html5up.net">HTML5 UP</a></li></ul>');
 */
/* https://www.freshdesignweb.com/css3-buttons/ */
$('.hypo-menue')
		.html(
				'<ulf>'
						+ '<lif><a href="../'+ HP_Sprache + '/agb.html" class="round green">AGB<span class="round">Allgemeine Geschï¿½fts bedingungen</span></a></lif><lif></lif>'
						+ '<lif><a href="../'+ HP_Sprache + '/impressum.html" class="round red">Impress<span class="round">Informationen zum Unternehmen</span></a></lif><lif></lif>'
						+ '<lif><a href="../'+ HP_Sprache + '/contact.html" class="round yellow">Kontakt<span class="round">Eine Nachricht senden. </span></a></lif><lif></lif>'
						+ '<lif><a href="../'+ HP_Sprache + '/#" class="round red">Demo<span class="round">Machen Sie eine Demo tour.</span></a></lif><lif></lif>'
						+ '<lif><a href="../'+ HP_Sprache + '/#" class="round green">Demo<span class="round">Machen Sie eine Demo tour.</span></a></lif><lif></lif>'
						+ '</ulf>');
