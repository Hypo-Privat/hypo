//accordion Slider https://jqueryui.com/accordion/ 
//hier als ID
/*$( function() {
    $( "#accordion" ).accordion({
    	 collapsible: true ,
    	heightStyle: "content"
        
      });
    } );

*/

// einlesen der UserDaten
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');



var ObjektDoc = [ [],  [] ];  //array für mehrere Documente
var savedir = '../uploads/' + HP_Key + '/'; // Immer Kunden Verzeichnis
var link  = "";

if(HP_Key  != null) {
	// einlesen der Dokumente zu dem Profil
	var func = 'getDocs';
	var PHPstring =("function=" + func + "&HP_Key=" +  HP_Key );
	getDokumete(PHPstring);
	
} 	else  {
	alert("Kein Indexkey nicht angemeldet!");
	window.location = "index.html#cta";
}

// laden der Profildaten wenn angemeldet
// Struktur zu Profil Daten zusammen setzen

$(document).ready(function()
		{
// https://xuad.net/artikel/vom-einfachen-ajax-request-zum-komplexen-objektaustausch-mit-json-mittels-jquery/
	var PersData = ( HP_Titel + ' ' + HP_Vorname + ' ' + HP_Nachname + ' - ' + HP_Key);
	
	$('.Welcome').html(
			'<h2>Wilkommen </h2> <h3> ' + PersData + '</h3>'
			+'In Ihrem Profil finden sie alle Dateien und Angaben zu ihren Anlagen und Darlehen.'
			
			);

	$('.PersInfo').html('<h3>Wenn Sie Fragen haben  bitte schicken Sie uns eine  <a href="mailto:support@hypo-privat.com?subject=Personalien Anpassung ('   + PersData + ')" target="_top"> E-Mail</a></h3>  ' 
			        + 'Bitte stellen Sie sicher dass alle Ihre Angaben wahrheitsgem&aumls erfasst sind. '
					+'Sollten wir feststellen dass dies nicht der Fall ist wird Ihr Account geschlossen. '
					+'In den einzelnen Sectionen haben Sie die M&oumlglichkeit Angaben zu machen und die erforderliche Dokumente einzureichen. Bitte stellen Sie soweit vorhanden entsprechende Unterlagen zur Verf&uumlgung.'
					+'Falls momentan nicht alle vorhanden sind k&oumlnnen sie diese sp&aumlter nachliefern.<br>	<b> Folgende Dateiformate sind erlaubt: (pdf, doc, txt,		odt, jpg , zip) .</b>'
					);

	// // VollstÃ¤ndige Texte indexkey usertype datum_update titel vorname
	// name datum_geb firma strasse
		// hausnr ort kanton plz sprache land
		// tel_buero tel_privat tel_fax tel_mobil mail homepage passwd agb
		// latitude longitude ipaddress
	
		
		var func = 'getUserDetail' ;
		var PHPstring =("function=" + func + "&indexkey=" +  HP_Key);
		$.ajax({
			type : "get",
			url : "../php/hypoUser.php",
			data : (PHPstring)  ,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
			async : false,
			success: function(data) {$.each( data,
					function(counter, daten) {
						
				$('.Person').html(' <b> Sie können Geburtsdatum, Sparche und Telefonnummern hier anpassen. Sollten sich Adressdaten &auml;ndern senden Sie uns ein ' 
							+ '<a href="mailto:support@hypo-privat.com?subject=Personalien Anpassung ('   + PersData + ')" target="_top"> E-Mail</a></b>'
						
							+ '<form id="UserUpdate"  method="get" accept-charset="utf-8" onsubmit="UserUpdate()">'
							+ ' <input type="hidden" id="func" value="UserUpdate">'
							+ ' <input type="hidden" id="HP_key" value="' + daten.indexkey + '">' 
							
							+ ' <div class="row uniform 50%">' 
							+ ' <div class="3u 12u ">' + daten.titel + '</div>'
							+ ' <div class="3u 12u ">' + daten.vorname + ' </div>'
							+ ' <div class="3u 12u ">' + daten.name + ' </div>'	
							+ '	<div class="3u 12u ">' + daten.land   + '</div></div>'

							+ ' <div class="row uniform 50%"><div class="3u 12u ">'+ daten.strasse	+'</div>'
							+ ' <div class="3u 12u ">' + daten.plz   + '</div>'
							+ '	<div class="3u 12u ">' + daten.ort  + '</div>'
							+ '	<div class="3u 12u ">' + daten.kanton   + '</div></div>'

							+ '	<div class="row uniform 50%">'	
							+ '	<div class="3u 12u ">' + daten.mail + '</div>'	
							+ '	<div class="3u 12u"> <input type="date" id="datum_geb"	value="' + daten.datum_geb + '"></div>'
							+ '	<div class="3u 12u">Sprache</div>'
							+ '	<div class="3u 12u"><select id="sprache"><option selected value="' + daten.sprache + '">' + daten.sprache +'</div>'							
							+ '</option><option value="de">Deutsch</option><option value="en">Englisch</option></select></div></div>'
						
							+ '<div class="row uniform 50%"><div class="3u 12u">Mobile<br><input type="text" id="mobile" value="' + daten.tel_mobil + ' " placeholder="Mobile" /></div>'
							+ '	<div class="3u 12u">Buero<br><input type="text" id="buero" value="' + daten.tel_buero + ' " placeholder="Office" /></div>'
							+ '	<div class="3u 12u">Privat<br><input type="text" id="privat" value="' + daten.tel_privat  + ' " placeholder="Privat" /></div>'
							+ '	<div class="3u 12u">Fax<br><input type="text" id="fax" value="' + daten.tel_fax + ' " placeholder="Fax" /></div></div>'
							
							+ '	<div class="row uniform 50%"><div class="12u 12u actions align-center"><input type="submit" value="Aendern" ></div></div></form>'					
				            
						);
				
//Ausgeben Dokumente mit Upload
			
				var link = "";
				for (var i = 0, len = ObjektDoc.length; i < len; i++) {
					// inner loop applies to sub-arrays
					for (var j = 0, len2 = ObjektDoc[i].length; j < len2; j++) {
						// accesses each element of each sub-array in turn
						//Nur Personaldokumente
						//alert(ObjektDoc[i][j]);
						if (ObjektDoc[i][j].substring(0, 2) === 'P-') {
							//alert(ObjektDoc[i][j]);	
							//	erg += i + " Index " + j + ": ";
							//Dateinamen erzeugen P-AUSWEIS-
							var erg = ObjektDoc[i][j].substring(2, 70)  ; 
							link += '<a href="' +  erg + '"target="_blank" class="button green small">' + erg.substring(22, 70) + '   </a>     ' ;
							// console.log( ObjektDoc[i][j] ); 
							//alert(erg );					
						}						
					}	
					var Documente = '<b>Bereits eingereichte Dokumente : </b><br>'  + link  ;	
				}
				
						
				var DocText = ('<div class="row uniform 50%"> <div class="12u 12u "><b>Upload persoenliche Unterlagen</b><br>'
								+ 'Ausweis oder Reispass, Lohnausweis, Schufa oder Betreibungsauskunft (Alle Unterlagen als *.zip file)<br>'
								+ Documente + "</div></div>");
				
				$('.PersDokumenteDA').html(DocText);
				
				upload = ('<td  colspan="4"><form method="POST" enctype="multipart/form-data"	action="../php/uploadFile.php">'
					+ '<div class="row uniform 100%"><div class="4u 12u"><input type="hidden" name="HP_Key" value="' + daten.indexkey +'"> '
					+ '<input type="hidden" name="HP_Doc" value="' + HP_Key +'"> '
					+ ' <select class="button blue small" name="FileName">'
					+ '<option selected value="Auswahl">Bitte Dokument ausw&auml;len</option>'
					+ '<option  value="Ausweis">Personalausweis</option>'
					+ '<option value="Lohn">Lohnausweis</option>'
					+ '<option value="Schuld">Schufa/Betreibungsauskunft</option>'
					+ '<option value="allPersonal">Alle als ZIP File</option></select>'
					+ '<input type="hidden" name="DocGroup" value="P"></div>'
					+ '<div class="4u 12u"><input class="button  small" name="userfile" type="file"></div>' + '<div class="4u 12u"><input class="button  small" type="submit" name="submit" value="Speichern"></div></div>	</form></td>');
		

				$('.PersDokumenteUpload').html(upload);
				
		
			
			});
			},
			
			error : function(data, req, status, err) {
				alert('Something went wrong !!! getUserDetail '
						+ data
						+ " req = "
						+ req
						+ " status = "
						+ status
						+ " err = " + err);
				window.location.assign = "UserProfil.html";
			}
		});
		
		// Wird nicht benötiget $("#PersonData").click(function() {			});
		/*
		 * <!- Personen Daten ende------------->
		 * <!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Anlage Daten Begin------------->
		 */
		// AJAX-Aufruf mit Template nachladen
		$("#AnlageData").click(function() {
			
		
			$('.AnlageHead').html('<td><h3>In folgende Objekte haben Sie investiert ! </h3></td>');
			$('.AnlageObjekt').html('');  //löschen sonnst doppelt
			
			var func = 'getAnlageDetail'
			var PHPstring =("function=" + func + "&anl_indexkey=" +  HP_Key);
			
			var linkxx = "";
			// alert("function=" + func + "&anl_indexkey=" + HP_Key);
			$.ajax({
				type : "get",
				url : "../php/hypoAnlage.php",
				data : (PHPstring)  ,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
				async : false,
				success: function(data) {$.each( data,
						function(counter, daten) {
					
					
			//gert							
				
					objektlink = ("getObjektData('" + daten.anl_typ + daten.anl_objekt  + "')");
					//alert(objektlink );
					$(' <div class="row uniform 50%">'
							+ ' <div class="3u 12u "><a href="objekt.html" class="button small green"  onclick="' + objektlink   + '; return popWIN(this,' + "'" + 'Objekt' + "'" + ')"> Objekt ID ' + daten.anl_objekt  + '</a></div>'
							+ ' <div class="3u 12u "> Betrag ' + daten.anl_betrag + '  ' + daten.anl_whrg + ' </div>'
							+ ' <div class="3u 12u ">Laufzeit ' + daten.anl_zeit   +  ' </div>'	
							+ '	<div class="3u 12u ">Rendite ' + daten.anl_zins + '%</div></div>'
						).appendTo('.AnlageObjekt');
				
				
					//Ausgeben Dokumente mit Upload
					
					var link = "";
					for (var i = 0, len = ObjektDoc.length; i < len; i++) {
						// inner loop applies to sub-arrays
						for (var j = 0, len2 = ObjektDoc[i].length; j < len2; j++) {
							// accesses each element of each sub-array in turn
							//Nur Personaldokumente
							//alert(ObjektDoc[i][j]);
							if (ObjektDoc[i][j].substring(0, 2) === 'A-') {
								//alert(ObjektDoc[i][j]);	
								//	erg += i + " Index " + j + ": ";
								//Dateinamen erzeugen P-AUSWEIS-
								var erg = ObjektDoc[i][j].substring(2, 70)  ; 
								link += '<a href="' + erg + '"target="_blank" class="button green small">' + erg.substring(22, 70) + '   </a>     ' ;
								// console.log( ObjektDoc[i][j] ); 
								//alert(erg );					
							}						
						}	
						var Documente = '<b>Bereits eingereichte Dokumente : </b>  '  + link  ;	
					}
					var DocText = ('<div class="row uniform 50%"> <div class="12u 12u "><b>Upload Anlage Unterlagen: </b>  '
							+ 'Vertrag f&uuml;r Anleger (Alle Unterlagen als *.zip file)<br>'
							+ Documente + " </div></div>");
			
					$('.AnlageVertrag').html('<div class="row uniform 50%"> <div class="12u 12u ">'
							+ '<b>  Bitte Anlegervertrag herunterladen, unterschrieben wieder uploaden.  </b>'
							+ '<a href="/checklisten/Vertrag-Anleger.pdf"	title="Vertrag Anleger" target="_blank" class="button blue small">Anlegervertrag </a><br>'
							+ Documente +' </div></div>');
			
				//	$('.AnlDokumenteDA').html(Documente);
			
			upload = ('<td  colspan="4"><form method="POST" enctype="multipart/form-data"	action="../php/uploadFile.php">'
				+ '<div class="row uniform 100%"><div class="4u 12u"><input type="hidden" name="HP_Key" value="' + HP_Key +'"> '
				+ '<input type="hidden" name="HP_Doc" value="' + HP_Key +'"> '
				+ ' <select class="button blue small" name="FileName">'
				+ '<option selected value="Auswahl">Bitte Dokument ausw&auml;len</option>'
				+ '<option  value="AnlVertrag">Anleger Vertrag unterschrieben</option>'
				
				+ '<option value="allPersonal">Alle als ZIP File</option></select>'
				+ '<input type="hidden" name="DocGroup" value="A"></div>'
				+ '<div class="4u 12u"><input class="button  small" name="userfile" type="file"></div>' + '<div class="4u 12u"><input class="button  small" type="submit" name="submit" value="Speichern"></div></div>	</form></td>');
	

			$('.AnlageUpload').html(upload);
				
				});
				 var AnlageObjekt = '';  // l&oumlschen inhalt das sonnst doppelt
				},
				
				error : function(data, req, status, err) {
					alert('Something went wrong !!! getAnlageDetail '
							+ data
							+ " req = "
							+ req
							+ " status = "
							+ status
							+ " err = " + err);
					window.location.assign = "UserProfil.html";
				}
			});


				

		});
		/*
		 * <!--Anlage Daten ende------------->
		 * <!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Darlehen Daten
		 * Begin------------->
		 */
		// AJAX-Aufruf mit Template nachladen
		
	
	
		$("#DarlehenData").click(function() {
			 $('.DarlehenHead').html('	<td  ><h3>Sie haben folgende Darlehen beantragt ! </h3></td>');
			 
			 $('.DarlehenBuerge').html( '<td colspan="4"><a href="buerge.html"  class="button small fit" onClick="return popWIN(this,' + "'" + 'Buerge' + "'" + ')">Sie moechten einen zusaetzlichen Buergen erfassen ?  </a></td>');
				
			
			var func = 'getDarlehenDetail'
			var PHPstring =("function=" + func + "&darl_indexkey=" +  HP_Key);
			// alert("function=" + func + "&anl_indexkey=" + HP_Key);
			$.ajax({
				type : "get",
				url : "../php/hypoDarlehen.php",
				data : (PHPstring)  ,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
				async : false,
				success: function(data) {$.each( data,
						function(counter, daten) {
					
					 // alert( "function=" + func + '<tr><td><b>Betrag </b>'
						// + daten.darl_betrag);
				
					 Darlehen =  Darlehen + ('<td><b>Betrag </b>' + daten.darl_betrag   + '  ' + daten.darl_whrg + '</td>' 
							+ ' <td>Laufzeit  ' + daten.darl_zeit + '</td>'
							+ ' <td>Monatliche Rate ' + daten.darl_rate +  '</td>'
							);
					
					$('.Darlehen').html(   Darlehen );
					
					/* SELECT `darl_indexkey`, `brg_indexkey`, `usr_indexkey`, `brg_datum_update`, `brg_titel`, `brg_vorname`, `brg_name`, `brg_datum_geb`,				
					 `brg_strasse`, `brg_hausnr`, `brg_ort`, `brg_plz`, `brg_sprache`, `brg_land`, `brg_tel_privat`, `brg_mail`, `brg_agb`,
					 `brg_ausweis`, `brg_schufa`, `brg_lohn` */
					
					// einlesen der Dokumente zu dem Profil
					var func = 'getBuergeDetail';
					var PHPstring =("function=" + func + "&darl_indexkey=" +  daten.darl_indexkey);
					getBuerge(PHPstring);
					
				
							
				});
				 var  Darlehen = '';  // l&oumlschen inhalt das sonnst doppelt
				
				},
				
				error : function(data, req, status, err) {
					alert('Something went wrong !!! getDarlehenDetail = '
							+ data
							+ " req = "
							+ req
							+ " status = "
							+ status
							+ " err = " + err);
				
					window.location = "UserProfil.html";
				}
				
			});


		});
		/*
		 * <!--Darlehen Daten ende------------->
		 * 
		 * 
		 * <!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Objekt Daten Begin------------->
		 */
		// AJAX-Aufruf mit Template nachladen
		$("#ObjektData").click(function() {
						
			var PHPstring =("function=getObjekt&HP_Key=" +  HP_Key);
		
			$.ajax({
				type : "get",
				url : "../php/hypoProfil.php",
				data : (PHPstring)  ,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
				async : false,
				success: function(data) {$.each( data,
						function(counter, daten) {
							if (typeof (window.localStorage) != 'undefined') {
							       // alert(" window.localStorage");
									window.localStorage.setItem('HP_ObjektId', daten.obj_indexkey);
									} else {
									alert(" window.localStorage, not defined" 	+ (daten.obj_indexkey));
									throw "window.localStorage, not defined";
								}
							
					
							
						
							 	$('.ObjektHead').html(' <b> Sie können die Objektbeschreibung hier anpassen. Sollten sich andere Daten &auml;ndern senden Sie uns ein ' 
							+ '<a href="mailto:support@hypo-privat.com?subject=Objekt Anpassung ('   + PersData + ' - Obj_indexkey ' + daten.obj_indexkey + ')" target="_top"> E-Mail</a></b>'
							+ '<form id="ObjektUpdate"  method="get" accept-charset="utf-8" onsubmit="ObjektUpdate()">'
							+ ' <input type="hidden" id="func3" value="ObjektUpdate">'
							+ ' <input type="hidden" id="indexkey" value="' + HP_Key + '">' 
							+ ' <input type="hidden" id="obj_indexkey" value="' + daten.obj_indexkey + '">' 
											
							+ ' <div class="row uniform 50%">'
							+ ' <div class="3u 12u "><b>ID - </b>' + daten.obj_indexkey + ' </div>'
							+ ' <div class="3u 12u ">' + daten.obj_land + ' </div>'	
							+ '	<div class="3u 12u ">' + daten.obj_ort   + '</div>'
							+ '	<div class="3u 12u ">' + daten.obj_strasse   + '</div></div>'
							
							/*
							+ ' <div class="row uniform 50%"><div class="3u 12u "><b>Wert </b> '+ daten.obj_wert + ' ' + daten.obj_whrg + '</div>'
							+ ' <div class="3u 12u "><b>Grundbuchauzug aktuell </b> '+ daten.obj_grundbuch   + '</div>'		
							+ '	<div class="3u 12u "> <b>Beleihung - </b>' + daten.darl_betrag + '</div>'				
							+ '	<div class="3u 12u "> <b>Zinssatz % </b>' + daten.darl_zins + '</div></div>'
							 */
													
							+ ' <div class="row uniform 50%"><div class="12u 12u ">	'
							+ '<textarea id="obj_text" placeholder="Objektbeschreibung" 	rows="7" cols="50" onkeyup="checkLen()">' + daten.obj_text + '</textarea> </div></div>'

							+ '	<div class="row uniform 50%"><div class="12u 12u actions align-center"><input type="submit" value="Aendern" /></div></div>'
							
							+ '	</form><br>'										
				            
						);
							
							
						
								
								//Ausgeben Bilder zum Objekt Dokumente mit Upload && ObjektDoc[i][j].substring(2, 5) === 'Bild-'
								
								var link = "";
								for (var i = 0, len = ObjektDoc.length; i < len; i++) {
									// inner loop applies to sub-arrays
									for (var j = 0, len2 = ObjektDoc[i].length; j < len2; j++) {
										// accesses each element of each sub-array in turn
										//Nur Personaldokumente
										if (ObjektDoc[i][j].substring(0, 2) === 'O-' ) {
											//alert(ObjektDoc[i][j]);	
											//	erg += i + " Index " + j + ": ";
											//Dateinamen erzeugen
											var erg = ObjektDoc[i][j].substring(2, 70)  ; 
											link += '<a href="' + erg + '"target="_blank" class="button green small">' + erg.substring(22, 70) + '   </a>     ' ;
											// console.log( ObjektDoc[i][j] ); 
											//alert(erg );		
										}
										if (ObjektDoc[i][j].substring(0, 2) === 'B-'   ){
											//Bilder anzeigen
											var image =  '<button ><img  src="../' + ObjektDoc[i][j].substring(2, 70)  + '"></button>';											
											$(image).appendTo('.ObjektBilderListe');
										}
													
										var Documente = '<b>Bereits eingereichte Dokumente : </b><br>'  + link  ;
									}								
												
								}
								
								
								var DocText = ('<div class="row uniform 50%"> <div class="12u 12u "><b>Upload Unterlagen und Bilder zum Objekt</b><br>'
												+ 'Versicherungspolice, Grundbuchauszug, Schuldscheine (Alle Unterlagen als *.zip file)<br>'
												+ Documente + "<br></div></div>");
								
								 $('.ObjektDoc').html(DocText);
								 
								 upload = ('<td  colspan="4"><form method="POST" enctype="multipart/form-data"	action="../php/uploadFile.php">'
											+ '<div class="row uniform 100%"><div class="4u 12u">'
											+ '<input type="hidden" name="HP_Key" value="' + HP_Key +'"> '
											+ '<input type="hidden" name="HP_Doc" value="' + daten.obj_indexkey +'"> '
											+ ' <select class="button blue small" name="FileName">'
											+ '<option selected value="Auswahl">Bitte Dokument ausw&auml;len</option>'
											+ '<option  value="Bild">Bilder</option>'
											+ '<option value="Versicherung">Versicherung</option>'
											+ '<option value="Schuld">Schuldbrief</option>'
											+ '<option value="Grund">Grundbuchauszug</option>'
											+ '<option value="allObjekt">Alle als ZIP File</option></select>'
											+ '<input type="hidden" name="DocGroup" value="O"></div>'
											+ '<div class="4u 12u"><input class="button  small" name="userfile" type="file"></div>' + '<div class="4u 12u"><input class="button  small" type="submit" name="submit" value="Speichern"></div></div>	</form></td>');
								

								$('.ObjektUpload').html(upload);
								
				});
			
				},
				error : function(data, req, status, err) {
					alert('Something went wrong !!! getObjekt '
							+ data
							+ " req = "
							+ req
							+ " status = "
							+ status
							+ " err = " + err);
					window.location.assign = "UserProfil.html";
				}
				
			});
			//$('.ObjektBilderListe').html('');
		});
		
		
		 /* <!--@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Rendite Objekt Daten  Begin------------->  */
		/*
		 * SELECT `rend_indexkey`, `rend_user`, `rend_insertdate`, `rend_name`, `rend_typ`, `rend_wert`, 
		 * `rend_wert_whrg`, `rend_eigenkapital`, `rend_fremdkapital`, `rend_funding`, `rend_zins`, `rend_text`, 
		 * `rend_strasse`, `rend_hausnr`, `rend_plz`, `rend_ort`, `rend_land`, `rend_datumbis`, `rend_sicherheit` FROM `hp_renditeobjekt` WHERE 1
		 * 
		 */
		
		$("#RenditeObjektData").click(function() {
			
			
			
			var func = 'getRenditeDetail'
			var PHPstring =("function=" + func + "&rend_user=" +  HP_Key );
		
			$.ajax({
				type : "get",
				url : "../php/hypoRendite.php",
				data : (PHPstring)  ,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
				async : false,
				success: function(data) {$.each( data,
						function(counter, daten) {
							if (typeof (window.localStorage) != 'undefined') {
							       // alert(" window.localStorage");
									window.localStorage.setItem('HP_RenditeObjektId', daten.rend_indexkey);
									} else {
									alert(" window.localStorage, not defined" 	+ (daten.rend_indexkey));
									throw "window.localStorage, not defined";
								}
							/*
							 * SELECT `rend_indexkey`, `rend_user`, `rend_insertdate`, `rend_name`, `rend_typ`, `rend_wert`, 
							 * `rend_wert_whrg`, `rend_eigenkapital`, `rend_fremdkapital`, `rend_funding`, `rend_zins`, `rend_text`, 
							 * `rend_strasse`, `rend_hausnr`, `rend_plz`, `rend_ort`, `rend_land`, `rend_datumbis`, `rend_sicherheit` FROM `hp_renditeobjekt` WHERE 1
							*/
								
					
							
							$('.RendObjektFunding').html(' <b> Sie können die Objektbeschreibung hier anpassen. Sollten sich andere Daten &auml;ndern senden Sie uns ein ' 
							+ '<a href="mailto:support@hypo-privat.com?subject=RenditeObjekt Anpassung ('   + PersData + ' - Rend_indexkey ' + daten.rend_indexkey + ')" target="_top"> E-Mail</a></b>'
							+ '<form id="RenditeUpdate"  method="get" accept-charset="utf-8" onsubmit="RenditeUpdate()">'
							+ ' <input type="hidden" id="func2" value="RenditeUpdate">'
							+ ' <input type="hidden" id="indexkey" value="' + HP_Key + '">' 
							+ ' <input type="hidden" id="rend_indexkey" value="' + daten.rend_indexkey + '">' 
							
							+ ' <div class="row uniform 50%"><div class="12u 12u "><h3>' + daten.rend_name+ '</h3></div></div>'
							
							+ ' <div class="row uniform 50%">'
							+ ' <div class="3u 12u "><b>ID - </b>' + daten.rend_indexkey + ' </div>'
							+ ' <div class="3u 12u ">' + daten.rend_land + ' </div>'	
							+ '	<div class="3u 12u ">' + daten.rend_ort   + '</div>'
							+ '	<div class="3u 12u ">' + daten.rend_strasse   + '</div></div>'

							+ ' <div class="row uniform 50%"><div class="3u 12u "><b>Wert </b> '+ daten.rend_wert + ' ' + daten.rend_wert_whrg + '</div>'
							+ ' <div class="3u 12u "><b>Objekt Sicherheit </b> '+ daten.rend_sicherheit   + '</div>'						
							+ '	<div class="3u 12u "> <b>Zinssatz % </b>' + daten.rend_zins + '</div>'
							+ '	<div class="3u 12u "><b>Funding Ende  </b> ' + daten.rend_datumbis + '</div>'
							+ '	<div class="3u 12u "> <b> </b>'  	 + '</div></div>'
							
							+ ' <div class="row uniform 50%"><div class="3u 12u "><b>Kennzahlen in </b>'  + daten.rend_wert_whrg + ' </div>'											
							+ '	<div class="3u 12u "> <b>Eigenkapital - </b>' + daten.rend_eigenkapital + '</div>'
							+ '	<div class="3u 12u "> <b>Fremdkapital - </b>' + daten.rend_fremdkapital + '</div>'
							+ '	<div class="3u 12u "> <b>Funding - </b>' + daten.rend_funding 	 + '</div></div>'
							
							+ ' <div class="row uniform 50%"><div class="12u 12u ">	'
							+ '<textarea id="rend_text" placeholder="Projektbeschreibung" 	rows="7" cols="50" onkeyup="checkLen()">' + daten.rend_text + '</textarea> </div></div>'

							+ '	<div class="row uniform 50%"><div class="12u 12u actions align-center"><input type="submit" value="Aendern" /></div></div>'
							
							+ '	</form><br>'										
				            
						);
							
						
								//Ausgeben Bilder und Dokumente ligen bei  Renditeobjekten in eigenen Folder'
						
								savedir = '../uploads/' + daten.rend_indexkey  + '/';
								var link = "";
								for (var i = 0, len = ObjektDoc.length; i < len; i++) {
									// inner loop applies to sub-arrays
									for (var j = 0, len2 = ObjektDoc[i].length; j < len2; j++) {
										// accesses each element of each sub-array in turn
										//Nur Personaldokumente
										if (ObjektDoc[i][j].substring(0, 3) === 'RO-' ) {
											//alert(ObjektDoc[i][j]);	
											//	erg += i + " Index " + j + ": ";
											//Dateinamen erzeugen
											//var erg = ObjektDoc[i][j].substring(2, 60)  ; 
										//	alert(ObjektDoc[i][j]);	
											var erg = savedir + ObjektDoc[i][j].substring(25, 70)  ; 
											link += '<a href="' + erg + '"target="_blank" class="button green small">' + erg.substring(22, 70)+ '   </a>     ' ;
											// console.log( ObjektDoc[i][j] ); 
											//	alert(erg + '   ' + daten.rend_indexkey);		
										}
										if (ObjektDoc[i][j].substring(0, 3) === 'RB-'   ){
											//Rendiete Bilder anzeigen
											
											var image =  '<button ><img  src="../' + savedir + ObjektDoc[i][j].substring(25, 70)   + '"></button>';											
											//	$('<a href="' +  image + '" target="_blank" ><img src="' +  image + '"  style="width:80px ; height:60px;">  </a>').appendTo('.RendObjektBilderListe');
											$(image).appendTo('.RendObjektBilderListe');
										}
													
										var Documente = '<b>Bereits eingereichte Dokumente : </b><br>'  + link  ;
									}								
												
								}
								
								
								var DocText = ('<div class="row uniform 50%"> <div class="12u 12u "><b>Upload Unterlagen und Bilder zum Objekt</b><br>'
												+ 'Versicherungspolice, Grundbuchauszug, Schuldscheine (Alle Unterlagen als *.zip file)<br>'
												+ Documente + "</div></div>");
								
								 $('.RendObjektDoc').html(DocText);
								 
								 upload = ('<td  colspan="4"><form method="POST" enctype="multipart/form-data"	action="../php/uploadFile.php">'
											+ '<div class="row uniform 100%"><div class="4u 12u"><input type="hidden" name="HP_Key" value="' + daten.rend_indexkey +'"> '
											+ '<input type="hidden" name="HP_Doc" value="' + daten.rend_indexkey +'"> '
											+ ' <select class="button blue small" name="FileName">'
											+ '<option selected value="Auswahl">Bitte Dokument ausw&auml;len</option>'
											+ '<option  value="RenditeBild">Bilder</option>'
											+ '<option value="Versicherung">Versicherung</option>'
											+ '<option value="Schuld">Schuldbrief</option>'
											+ '<option value="Grund">Grundbuchauszug</option>'
											+ '<option value="allObjekt">Alle als ZIP File</option></select>'
											+ '<input type="hidden" name="DocGroup" value="RO"></div>'
											+ '<div class="4u 12u"><input class="button  small" name="userfile" type="file"></div>' 
											+ '<div class="4u 12u"><input class="button  small" type="submit" name="submit" value="Speichern"></div></div>	</form></td>');
								

								$('.RendObjektUpload').html(upload);				
				});
				},
				error : function(data, req, status, err) {
					alert('Something went wrong !!! getObjekt '
							+ data
							+ " req = "
							+ req
							+ " status = "
							+ status
							+ " err = " + err);
					window.location.assign = "UserProfil.html";
				}
			});
		});
		
		
		/* <!--Rendite Objekt Daten ende-------------> */
		
		
});



//einlesen der Daten Buerge
function getBuerge(PHPstring){

	$.ajax({
	type : "get",
	url : "../php/hypoDarlehen.php",
	data : (PHPstring)  ,
	contentType : "application/json", // charset=utf-8", // Set
	dataType : 'json',
	jsonCallback : 'getJson',
	async : false,
	success: function(data) {
  	$.each( data, function(counter, daten) {
  		
			$('.Buerge').html('<td colspan="4" ><h2>Angaben Buerge</h2>'
					+ ' <h4><div class="row uniform 50%"><div class="3u 12u ">' + daten.brg_titel + '</div>'
					+ ' <div class="3u 12u ">' + daten.brg_vorname + ' </div>'
					+ ' <div class="3u 12u ">' + daten.brg_name + ' </div>'						
					+ '	<div class="3u 12u">' + daten.brg_datum_geb + '</div></div>'

					+ ' <div class="row uniform 50%"><div class="3u 12u ">'+ daten.brg_strasse	+'</div>'
					+ ' <div class="3u 12u ">' + daten.brg_plz   + '</div>'
					+ '	<div class="3u 12u ">' + daten.brg_ort  + '</div>'				
					+ '	<div class="3u 12u ">' + daten.brg_land   + '</div></h4></div>'
					
					+ ' <div class="row uniform 50%"><div class="3u 12u ">'+ daten.brg_mail	+'</div>'
					+ ' <div class="3u 12u ">' + daten.brg_sprache   + '</div>'
					+ '	<div class="3u 12u ">' + daten.brg_tel_privat  + '</div>'				
					+ '	<div class="3u 12u ">' + daten.brg_indexkey   + '</div></h4></td>'
				);
  	  });
	},
	error : function(data, req, status, err) {
	alert('Something went wrong !!! getBuerge(PHPstring) = ' + data + " req = " + req + " status = " + status + " err = " + err);
	window.location.assign = "error.html";
	}
	});
}
//ENDE einlesen Daten Buerge


// einlesen der Dokumente zu dem Profil
function getDokumete(PHPstring){
	var ix1 =0 ;
	var ix2 = 0 ;
	$.ajax({
	type : "get",
	url : "../php/hypoProfil.php",
	data : (PHPstring)  ,
	contentType : "application/json", // charset=utf-8", // Set
	dataType : 'json',
	jsonCallback : 'getJson',
    async : false,
    success: function(data) {
    	$.each( data, function(counter, daten) {
    		
    		var filename = daten.doc_filename;
    		var docgroup = daten.doc_group ;
    		var lamp = ('<td><span class="icon green fa-lightbulb-o"></span></td>');
    		
    		
										savedir = '../uploads/' + daten.user + '/';
										ix2 = daten.doc_indexkey ;
									
										//document.write(counter + " index "  + daten.doc_indexkey  + " -"  + daten.doc_filename + "<br />");
										//einfügen 	doc
										var i = 0 ;										
								/*		if (ix2 > ix1) {
											//falls mit meherer Objekte Index pro user eingetragen werden
											 ix1 = daten.doc_indexkey;
											i++;
											};
																		
										alert(i  + ' -ix1  ' + ix1  + ' -ix2  ' + ix2 );
								*/		
									//	ObjektDoc[i][counter] = ( daten.doc_group + '-'  + daten.doc_filename  + '-' + savedir  + daten.doc_name );
										ObjektDoc[i][counter] = ( daten.doc_group + '-'  + savedir    +  daten.doc_name );									
										/*
										 * erg = ObjektDoc[i][counter] + "<br />";
										 * document.write(erg);
										 */
/*
										if (filename === 'Bild') {
											
												var DocText = (	'<td><b>Bilder zum Objekt laden</b></br>'	);
												DocName = ('<a href="' + savedir  + daten.doc_name + '" target="_blank">' + daten.doc_name + ' </a>' );			
												$('<a href="' + savedir  + daten.doc_name + '" target="_blank"><img src="' + savedir  + daten.doc_name + '"  style="width:80px ; height:60px;">  </a>').appendTo('.ObjektBilderListe');
									
												 upload = ( DocText + FormHead
													 + '<input type="hidden" name="FileName" value="Bild"> '
													 + '<input type="hidden" name="DocGroup" value="O">'
													 +  FileUpFormFoot
												     +	'<td></td>'
													 +	lamp );

											 // alert(upload) ;
											 $('.ObjektBild').html(upload);
											 DocBild = 'ok' ;
											}	
											*/					
    	});

				},
				error : function(data, req, status, err) {
					alert('Something went wrong !!! get Docs = ' + data
							+ " req = " + req + " status = " + status
							+ " err = " + err);
					 window.location.assign = "error.html";
				}
			});
}
// ENDE einlesen der Dokumente zu dem Profil




function UserUpdate() {
	
	//alert("UserUpdate");
	var f = document.UserUpdate;
		
	var func = document.getElementById("func").value;
	var indexkey = document.getElementById("HP_key").value;
		
	var datum_geb = document.getElementById("datum_geb").value;		
	var sprache = document.getElementById("sprache").value;			
	var mobile = document.getElementById("mobile").value;
	var buero = document.getElementById("buero").value;
	var privat = document.getElementById("privat").value;
	var fax = document.getElementById("fax").value;
	
	//	alert("function=" + func + "&indexkey=" + indexkey  + "&sprache=" + sprache + "&mobil=" + mobile + "&buero=" + buero + "&privat=" + privat + "&fax=" + fax);

		$.ajax({
			type : "get",
			url : "../php/hypoUser.php",
			data : "function=" + func + "&indexkey=" + indexkey  + "&sprache=" + sprache + "&mobil=" + mobile + "&buero=" + buero + "&privat=" + privat + "&fax=" + fax + "&datum_geb=" + datum_geb ,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
		    async : false,
		    success : function() {
				//alert("success : function() =");
				window.location.assign = "UserProfil.html";
				
			},
			error : function() {
				alert("error: profil.js = php/hypoUser.php");
				window.location.assign = "index.html#cta";
				
			}
		});
}


function RenditeUpdate() {
	
	//alert("RenditeUpdate");
	
	var f = document.RenditeUpdate;		
	var func = document.getElementById("func2").value;
	var indexkey = document.getElementById("HP_key").value;
	var rend_indexkey = document.getElementById("rend_indexkey").value;		
	var rend_text = document.getElementById("rend_text").value;

	//alert("function=" + func + "&indexkey=" + indexkey  + "&rend_indexkey=" + rend_indexkey + "&rend_text=" + rend_text);
	
		$.ajax({
			type : "get",
			url : "../php/hypoRendite.php",
			data : "function=" + func + "&indexkey=" + indexkey  + "&rend_indexkey=" + rend_indexkey + "&rend_text=" + rend_text ,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
		    async : false,
		    success : function() {
				//alert("success : function() =");
				window.location.assign = "UserProfil.html";
				
			},
			error : function() {
				alert("error: profil.js = php/hypoRendite.php function=" + func + "&indexkey=" + indexkey  + "&rend_indexkey=" + rend_indexkey + "&rend_text=" + rend_text);
				window.location.assign = "index.html#cta";
				
			}
		});
}



function ObjektUpdate() {
	
	//alert("objektUpdate");
	
	var f = document.ObjektUpdate;		
	var func = document.getElementById("func3").value;
	var indexkey = document.getElementById("HP_key").value;
	var obj_indexkey = document.getElementById("obj_indexkey").value;		
	var obj_text = document.getElementById("obj_text").value;

	//alert("function=" + func + "&indexkey=" + indexkey  + "&obj_indexkey=" + obj_indexkey + "&obj_text=" + obj_text );
	
		$.ajax({
			type : "get",
			url : "../php/hypoDarlehen.php",
			data : "function=" + func + "&indexkey=" + indexkey  + "&obj_indexkey=" + obj_indexkey + "&obj_text=" + obj_text ,
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
		    async : false,
		    success : function() {
				//alert("success : function() =");
				window.location.assign = "UserProfil.html";
				
			},
			error : function() {
				alert("error: profil.js = php/hypoDarlehen.php function=" + func + "&indexkey=" + indexkey  + "&obj_indexkey=" + obj_indexkey + "&obj_text=" + obj_text);
				window.location.assign = "index.html#cta";
				
			}
		});
}

function getObjektData(obj_indexkey) {	
//Schreiben des Objektkeys für einzel Anzeige
//	alert("function=getLive" + "&indexkey=" + "&obj_indexkey=" + obj_indexkey  );
	window.localStorage.setItem('Obj_Indexkey', obj_indexkey);
	
		
		
}
