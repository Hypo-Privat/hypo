// Initialisieren Var zum Rechnen
var finanziert = 0;
var userangelegt = 0;
var beleihung = 0;
var dt = new Date();
var year = dt.getFullYear();
var alteruser = 0;

var allAuction = '';
var formsaveAnlage = '';

//Bilder
var image = '';
var all_pictures = '';
// leeren variabel
var old_phpstring = 0;

// einlesen der UserDaten

var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');

// alert("HP_Key" + HP_Key);
welcome = ('<h2>Aktuelle Rendite Angebote</h2><h3>Machen Sie das beste aus Ihrem Geld</h3>');
if (HP_Key != null) {

	$('.Welcome').html(welcome + 'Guten Tag ' + HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname);
} else {
	formsaveAnlage = '';
	$('.Welcome').html(welcome + ' <font color="red">Guten Tag ! <a href="index.html#cta">Um zu investieren  bitte erst anmelden  oder registrieren. </a></font>');
}

// einlesen der daten für die Live auction
// function getDokumete(PHPstring){

$.ajax({
	type: "get",
	url: "../php/hypoRendite.php",
	data: ("function=getRenditeLive"),
	contentType: "application/json", // charset=utf-8", // Set
	dataType: 'json',
	jsonCallback: 'getJson',
	async: false,
	success: function(data) {
		$.each(data, function(counter, daten) {
				var old_phpstring = daten.rend_indexkey;

				/*
				 *SELECT  anl_objekt , sum(anl_betrag) as sumbetrag , anl_whrg
				 `rend_user`, `rend_indexkey`, `rend_insertdate`, `rend_name`, `rend_typ`,
				 `rend_wert`, `rend_wert_whrg`, `rend_eigenkapital`, `rend_fremdkapital`, `rend_funding`
				 , `rend_zins`, `rend_text`, `rend_strasse`, `rend_hausnr`, `rend_plz`, `rend_ort`, `rend_land`,
				 `rend_datumbis`, `rend_sicherheit` FROM `hp_renditeobjekt` WHERE 1
				 */
				// alert('daten.rend_indexkey ' + daten.rend_indexkey + 'count ' + counter);
				// alert('counter ' + counter);

				finanziert = finanziert + daten.anl_betrag;
				// alert(finanziert);
				beleihung = daten.rend_funding / ( (daten.rend_wert - daten.rend_fremdkapital - daten.rend_eigenkapital) / 100);
				// alert(beleihung);
				maxBetrag = daten.rend_funding - finanziert;
				// alert(maxBetrag);
				progangelegt = (finanziert / (daten.rend_funding / 100));
				//minimaler Anleger Betrag
				minBetrag = (daten.rend_funding / 20);

				if (progangelegt < 100) {
					var rest = (daten.rend_funding - finanziert);
					//		alert('Objekt muss noch mit ' + rest + '  finanziert werden !!! ' );
					formsaveAnlage = (' <form id="saveAnlage' + counter + '" name="saveAnl" method="get" accept-charset="utf-8" onsubmit="checkAnlage(' + counter + ')">' + '<input type="hidden" id="func" value="insertAnlage">' + '<input type="hidden" id="ObjektID' + counter + '" value="' + daten.rend_indexkey + '">' + '<input type="hidden" id="HP_Key" value="' + HP_Key + '">' + '<input type="hidden" id="AnlZins' + counter + '" value="' + daten.rend_zins + '">' + '<input type="hidden" id="DarlZeit' + counter + '" value="0">' + '<input type="hidden" id="AnlWhrg' + counter + '" value="' + daten.anl_whrg + '">' + '<input type="hidden" id="AnlTyp' + counter + '" value="rend">' + '<div class="row uniform 50%">	<div class="12u 12u">' + 'Es sind maximal 20 Investoren zugelassen, die Mindestinvestition betr&auml;gt ' + minBetrag + ' ' + daten.anl_whrg + '<br><b>Moechten Sie in dieses Projekt investieren ?  </b></div></div>' + '<div class="row uniform 50%">' + '<div class="12u 12u"><input class="button alt small"type="number" id="AnlBetrag' + counter + '"	value="' + minBetrag + '"  max="' + maxBetrag + '" placeholder="' + minBetrag + '" "> ' + '</div>'//	+ '<div class="5u 12u">' + daten.anl_whrg  + ' anlegen.   Wieviel Rendite m&ouml;chten Sie ?<input type="hidden" id="AnlWhrg' + counter + '" value="' + daten.anl_whrg   +'"></div>	'
					//	+ '<div class="3u 12u">	<input class="button alt small" type="hidden"  id="AnlZins' + counter + '" value="2" max="9" min="1" placeholder="2" > %</div>'
					+ '</div>' + '<br><input class="button  fit small" type="submit" 	value="Jetzt Anlegen ?">' + ' </form>');

					//	alert(formsaveAnlage);

					AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-blue" style="width:' + progangelegt + '%"> ' + finanziert + ' ' + daten.anl_whrg + '</div> </div>';

				} else {
					var rest = (daten.rend_funding - finanziert);
					//	alert('Finanzierung abgeschlossen = '+ daten.rend_indexkey + '---' + rest + ' !!! ' );
					formsaveAnlage = '';
					AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-green" style="width:' + 100 + '%"> ' + finanziert + ' ' + daten.anl_whrg + '</div> </div>';

				}

				if (HP_Key === null) {
					formsaveAnlage = '';
				}
				/*
				 var geb = new Date(daten.datum_geb);
				 var gebyear = geb.getFullYear();
				 var alteruser = year - gebyear ;
				 // alert('alteruser = ' + alteruser);
				 */

				var flagge = '';
				switch (daten.rend_land) {
				case "Schweiz":
					flagge = '<img src="images/animierte-flagge-schweiz.gif" width="25"			height="65" border="1">';
					break;
				case "Deutschland":
					flagge = '<img src="images/animierte-flagge-deutschland.gif" width="25"			height="65" border="1">';
					break;
				case "Austria":
					flagge = '<img src="images/flagge-oesterreich-wehende-flagge-12x21.gif" width="25"			height="65" border="1">';
					break;
				}

				var AuctionHead = ('<h2>' + daten.rend_land + ' ' + daten.rend_plz + ' ' + daten.rend_ort + ' ' + daten.rend_strasse + '</h2>');

				// Bild Holen
				getRenditePic(daten.rend_indexkey);
				if (progangelegt < 100) {
					var AuctionBild = all_pictures; // class="pos_right"
				} else {
					var AuctionBild = all_pictures + '<span><h2><b>Funding finished</span></b></h2></div>'; // class="pos_right"
				}

				// alert('daten.indexkey = ' + daten.indexkey + ' daten.anl_indexkey = ' + daten.anl_indexkey) ;
				if (HP_Key == daten.anl_indexkey) {
					// alert('daten.anl_objekt = ' + daten.anl_objekt + '
					// daten.rend_indexkey = ' + daten.rend_indexkey) ;
					if (daten.anl_objekt == daten.rend_indexkey)
						userangelegt = userangelegt + daten.anl_betrag;
				}
				//	 alert('Sie habe in diesem Objekt ' + userangelegt + ' ' + daten.anl_whrg);

				// $('.AuctionTable').html('<table><tr><td><ul>'
				AuctionTable = ('<table ><tr class="align-left"><td><ul>' + '<li>Objekt Wert: ' 
						+ daten.rend_wert + ' ' + daten.rend_wert_whrg + ' </li>' + '<li>Funding: ' 
						+ daten.rend_funding + ' ' + daten.rend_wert_whrg + '</li>' + '<li>Finanziert: ' 
						+ finanziert + ' ' + daten.rend_wert_whrg + ' - ' + Math.round(progangelegt) + '%  </li>' + '<li>Rendite ca.: ' 
						+ daten.rend_zins + ' % </li>' + '</ul></td><td><ul>' + '<li>Eigenkapital: ' + daten.rend_eigenkapital + '</li>' 
						+ '<li>Grundschuld: ' + daten.rend_fremdkapital + '</li>' + ' <li>Sicherheit: ' + daten.rend_sicherheit + '</li>' 
						+ ' <li>Auszahlung Termin: ' + daten.rend_datumbis + '</li>' + ' </ul></td></tr><tr class="align-justify"><td colspan="2"><h4>' 
						+ daten.rend_name + '</h4>' + '<div>' + daten.rend_text + '</div></td></tr>' + '</td></tr></table>' + formsaveAnlage);

				// alert(AuctionHead + AuctuionBild + AuctionProgress + AuctionTable);
				allAuction = allAuction + (AuctionHead + AuctionBild + AuctionProgress + AuctionTable + '<HR color="purple"  size="6" >');
				// $('.Auction').html(AuctionHead + AuctionBild + '</span> ' + AuctionProgress + AuctionTable);

				$('.RenditeAuction').html(allAuction);
				userangelegt = 0; // loschen der Inhalte da sonnst doppelt berechnet
				finanziert = 0;
				AuctionTable = '';
			});

	},
	error: function(data, req, status, err) {
		alert('Something went wrong !!! get Docs = ' + data + " req = " + req + " status = " + status + " err = " + err);
		window.location = "error.html";
	}

});

// einlesen der Dokumente zu dem Profil
function getRenditePic(doc_indexkey) {
	//alert(doc_indexkey);
	if (old_phpstring != doc_indexkey) {
		var image = '';
	}
	;
	$.ajax({
		type: "get",
		url: "../php/hypoRendite.php",
		data: ("function=getRenditePic&rend_indexkey=" + doc_indexkey),
		contentType: "application/json", // charset=utf-8", // Set
		dataType: 'json',
		jsonCallback: 'getJson',
		async: false,
		success: function(data) {
			$.each(data, function(counter, daten) {

					savedir = '../uploads/' + daten.doc_indexkey + '/';
					//alert(savedir + ' - ' + daten.doc_name );
					if (daten.doc_filename === 'RenditeBild') {
						var DocName = ('<a href="' + savedir + daten.doc_name + '" target="_blank">' + daten.doc_name + ' </a>');

						div_image = '<ul  id="galerie">';
						image = image + '<lipic><button ><img  src="../' + savedir + daten.doc_name + '"> </button></lipic>';
						all_pictures = div_image + image + '</ul>';
					}

				});
		},
		error: function(data, req, status, err) {
			alert('Something went wrong !!! getPic= ' + data + " req = " + req + " status = " + status + " err = " + err);
			// window.location = "error.html";
		}
	});
}
// ENDE einlesen der Bilder zur Auction

function checkAnlage(counter) {
	//alert(counter);
	var form = document.querySelectorAll('#saveAnlage' + counter);

	var func = document.getElementById("func").value;

	var ObjektID = document.getElementById("ObjektID" + counter).value;
	var HP_Key = document.getElementById("HP_Key").value;
	var AnlBetrag = document.getElementById("AnlBetrag" + counter).value;
	var AnlWhrg = document.getElementById("AnlWhrg" + counter).value;
	var AnlZins = document.getElementById("AnlZins" + counter).value;
	var AnlZeit = document.getElementById("DarlZeit" + counter).value;
	var AnlTyp = document.getElementById("AnlTyp" + counter).value;

	var DatumZeitJetzt = new Date();
	var DatumZukunft = new Date();
	var AnzahlTage = 8;
	var msProTag = 86400000;

	DatumZukunft.setTime(DatumZeitJetzt.getTime() + AnzahlTage * msProTag);
	var Zahltag = DatumZukunft.toISOString();

	//var xday = DatumZukunft.getUTCDate(setTime(DatumZeitJetzt.getTime() + AnzahlTage * msProTag));

	alert(Zahltag);
	//	document.write('Berechnetes Zieldatum: ' + DatumZukunft.toLocaleString());

	//alert( "function=" + func + "&HP_Key=" + HP_Key + "&AnlBetrag=" + AnlBetrag + "&AnlWhrg="  + AnlWhrg  + "&ObjektID="  + ObjektID + "&AnlZeit="  + AnlZeit + "&AnlZins="  + AnlZins + "&Zahltag="  + Zahltag );

	$.ajax({
		type: "get",
		url: "../php/hypoAnlage.php",
		data: "function=" + func + "&HP_Key=" + HP_Key + "&AnlBetrag=" + AnlBetrag + "&AnlWhrg=" + AnlWhrg + "&ObjektID=" + ObjektID + "&AnlZeit=" + AnlZeit + "&AnlZins=" + AnlZins + "&Zahltag=" + Zahltag + "&AnlTyp=" + AnlTyp,
		contentType: "application/json", // charset=utf-8", // Set
		dataType: 'json',
		jsonCallback: 'getJson',
		async: false,
		success: function() {
			alert("Eine E-Mail mit den Zahlungsinformationen wurden Ihnen zugestellt. Sollte der Zahlungseingang nicht bis " + Zahltag + " erfolgen m&uuml;ssen wir Sie von weiteren Auktionen ausschliessen.");
			window.location = "UserProfil.html";
		},
		error: function() {
			alert('Something went wrong !!! checkAnlage');
			window.location = "index.html";

		}
	});
}
