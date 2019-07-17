//accordion Slider https://jqueryui.com/accordion/ 
//hier als ID
/*$( function() {
    $( "#accordion" ).accordion({
    	 collapsible: true ,
    	heightStyle: "content"
        
      });
    } );

*/
// Initialisieren Var zum Rechnen
var finanziert = 0;
var userangelegt = 0;
var beleihung = 0;
var dt = new Date();
var year = dt.getFullYear();
var alteruser = 0;
var image = '';
var allAuction = '';
var formsaveAnlage ='';
var Obj_typ = '';

// einlesen der UserDaten
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');
var Obj_Indexkey = window.localStorage.getItem('Obj_Indexkey');

// function getObjektData(obj_indexkey) {

if (Obj_Indexkey.substring(0, 4) ===  'rend')
	{ 	var Obj_typ = 'rend';
		var Obj_Indexkey = Obj_Indexkey.substring(4, 14) 
		var url = "../php/hypoRendite.php";
		var data = ("function=getRenditeLive&rend_indexkey=" + Obj_Indexkey )
} else {
		var url = "../php/hypoAnlage.php" ;
		var data = ("function=getLive&obj_indexkey=" + Obj_Indexkey );
}


// alert("function=getLive" + "&indexkey=" + "&obj_indexkey=" + url + ' ' +
// data);
	
$.ajax({
			type : "get",
			url : url ,
			data : data ,	  
			contentType : "application/json", // charset=utf-8", // Set
			dataType : 'json',
			jsonCallback : 'getJson',
			async : false,
			success: function(data) {
				$.each( data, function(counter, daten) {

					// alert('Obj_Indexkey ' + Obj_Indexkey + ' count ' +
					// Obj_typ);
					if (Obj_typ  ===  'rend'){						
					
					 		// alert('daten.rend_indexkey ' +
							// daten.rend_indexkey + 'count ' + counter);
							// alert('counter ' + counter);
					 		
					 		finanziert = finanziert + daten.anl_betrag ; 	
					 		// alert(finanziert);
							beleihung = daten.rend_funding / ((daten.rend_wert -  daten.rend_fremdkapital -  daten.rend_eigenkapital) / 100);
							// alert(beleihung);
							maxBetrag = daten.rend_funding - finanziert;
							// alert(maxBetrag);
							progangelegt = (finanziert/(daten.rend_funding/100));
							
							
							if ( progangelegt < 100  ){
								var rest = (daten.rend_funding - finanziert);			
							// alert('Objekt muss noch mit ' + rest + '
							// finanziert werden !!! ' );
								formsaveAnlage = (' <form id="saveAnlage' + counter + '" name="saveAnl" method="get" accept-charset="utf-8" onsubmit="checkAnlage(' + counter + ')">'
								+ '<input type="hidden" id="func" value="insertAnlage">'
								+ '<input type="hidden" id="ObjektID' + counter + '" value="' + daten.rend_indexkey +'">'
								+ '<input type="hidden" id="HP_Key" value="' + HP_Key +'">'
								+ '<input type="hidden" id="DarlZins' + counter + '" value="' + daten.rend_zins +'">'
								+ '<input type="hidden" id="DarlZeit' + counter + '" value="0">'
								+ '<input type="hidden" id="AnlTyp' + counter + '" value="rend">'
								
								+'<div class="row uniform 50%">	<div class="12u 12u">'
								+ '<b>Moechten Sie in dieses Projekt investieren ?  </b></div></div>'
								+ '<div class="row uniform 50%">'
								
								+ '<div class="4u 12u"><input class="button alt small"type="number" id="AnlBetrag' + counter + '"	value="5000"  max="' + maxBetrag + '" placeholder="5000" "> '+ '</div>'
								+ '<div class="4u 12u">' + daten.anl_whrg  + ' anlegen  zu<input type="hidden" id="AnlWhrg' + counter + '" value="' + daten.anl_whrg   +'"></div>	'
								+ '<div class="2u 12u">	<input class="button alt small" type="number"  id="AnlZins' + counter + '" value="2" max="9" min="1" placeholder="2" ></div>'
								+ '<div class="2u 12u"> % Zins </div> </div>'	
								
								+ '<br><input class="button  fit small" type="submit" 	value="Jetzt Anlegen ?">'
								+' </form>' );
								
							// alert(formsaveAnlage);
								
								AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-blue" style="width:'
									+ 	progangelegt + '%"> ' + finanziert + ' ' + daten.anl_whrg +'</div> </div>' ;
							
							} else { // progangelegt < 100
								var rest = (daten.rend_funding - finanziert);				
							// alert('Finanzierung abgeschlossen = '+
							// daten.rend_indexkey + '---' + rest + ' !!! ' );
								formsaveAnlage = '';
								AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-green" style="width:'
									+ 	100 + '%"> ' + finanziert + ' ' + daten.anl_whrg +'</div> </div>' ;
							
					        }
					      
									
							if(HP_Key  === null ) {formsaveAnlage = '';}
							/*
							 * var geb = new Date(daten.datum_geb); var gebyear =
							 * geb.getFullYear(); var alteruser = year - gebyear ; //
							 * alert('alteruser = ' + alteruser);
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
							
							var AuctionHead = ( '<span class="image featured align-center "><h2>' + daten.rend_land + ' ' + daten.rend_plz 	+ ' ' +  daten.rend_ort  + ' ' +  daten.rend_strasse + '</h2>' );
						   	    
						   // Bild Holen
							getPic(Obj_Indexkey);
							
							// alert('in getLive = ' + image) ;
							var AuctionBild =  '<div class="w3-content w3-section " style="max-width: 500px">'  + image + '</div>' ; // class="pos_right"
								
							// alert('daten.indexkey = ' + daten.indexkey + '
							// daten.anl_indexkey = ' + daten.anl_indexkey) ;
							if (HP_Key == daten.anl_indexkey){
								// alert('daten.anl_objekt = ' +
								// daten.anl_objekt + '
								// daten.rend_indexkey = ' +
								// daten.rend_indexkey) ;
								if (daten.anl_objekt == daten.rend_indexkey)
					 			userangelegt = userangelegt + daten.anl_betrag ;
					 		}
					 	// alert('Sie habe in diesem Objekt ' + userangelegt + '
						// ' + daten.anl_whrg);
							
							
							// $('.AuctionTable').html('<table><tr><td><ul>'
							AuctionTable = ('<table ><tr class="align-left"><td><ul>'			
								 + '<li>Objekt Wert: ' +  daten.rend_wert + ' ' + daten.rend_wert_whrg  +' </li>'
								 +'<li>Funding: ' + daten.rend_funding + ' ' + daten.rend_wert_whrg  +' '  + beleihung + '% </li>'
								 + '<li>Finanziert: ' + finanziert  + ' ' + daten.anl_whrg + '</li>'
								 + '<li>Rendite ca.: ' + daten.rend_zins + ' % </li>'
								+ '</ul></td><td><ul>'
								+ '<li>Eigenkapital: '+ daten.rend_eigenkapital+'</li>'
								+ '<li>Grundschuld: '+ daten.rend_fremdkapital +'</li>'
								+' <li>Sicherheit: ' + daten.rend_sicherheit +'</li>'
								+' <li>Auszahlung Termin: ' + daten.rend_datumbis +'</li>' 
								+ ' </ul></td></tr><tr class="align-justify"><td colspan="2"><h4>'+ daten.rend_name +  '</h4>' + daten.rend_text +'</td></tr>'
								+ '</td></tr></table>');
								
							// alert(AuctionHead + AuctuionBild +
							// AuctionProgress + AuctionTable);
						      allAuction =  allAuction  + (AuctionHead +  AuctionBild + '</span>	' +  AuctionProgress + AuctionTable + '<HR color="purple"  size="6" >') ;
							// $('.Auction').html(AuctionHead + AuctionBild +
							// '</span> ' + AuctionProgress + AuctionTable);
					 	
					 		$('.Auction').html(allAuction);
					 		userangelegt = 0 ; // loschen der Inhalte da sonnst
												// doppelt berechnet
					 	 	finanziert = 0 ;
					 	 	AuctionTable = '';
					 	
						
					} else { // Obj_typ === 'rend'
		  			
					/*
					 * anl_indexkey anl_date anl_objekt anl_betrag anl_zins
					 * anl_zeit obj_indexkey obj_insertdate obj_strasse obj_plz
					 * obj_ort obj_land obj_wert obj_whrg obj_baujahr
					 * obj_grundbuch obj_schuld obj_latitude obj_longitude
					 * doc_indexkey doc_group doc_doc_filename doc_name
					 * doc_savedate darl_indexkey darl_insertdate darl_einkommen
					 * darl_whrg darl_betrag darl_rate darl_zins darl_zeit
					 * darl_wunsch darl_Verwendung user: indexkey usertype
					 * datum_update titel vorname name datum_geb firma strasse
					 * hausnr ort kanton plz sprache land tel_buero tel_privat
					 * tel_fax tel_mobil mail
					 * 
					 */
					 		// alert('daten.obj_indexkey ' + daten.obj_indexkey
							// + 'count ' + counter);
							// alert('counter ' + counter);
					 		
					 		finanziert = finanziert + daten.anl_betrag ; 	
					 		// alert(finanziert);
							beleihung = daten.darl_betrag / (daten.obj_wert / 100);
							// alert(beleihung);
							maxBetrag = daten.darl_betrag - finanziert;
							// alert(maxBetrag);
							progangelegt = (finanziert/(daten.darl_betrag/100));
							
							if ( progangelegt < 100  ){
								var rest = (daten.darl_betrag - finanziert);			
							// alert('Objekt muss noch mit ' + rest + '
							// finanziert werden !!! ' );
								formsaveAnlage = (' <form id="saveAnlage' + counter + '" name="saveAnl" method="get" accept-charset="utf-8" onsubmit="checkAnlage(' + counter + ')">'
								+ '<input type="hidden" id="func" value="insertAnlage">'
								+ '<input type="hidden" id="ObjektID' + counter + '" value="' + daten.obj_indexkey +'">'
								+ '<input type="hidden" id="HP_Key" value="' + HP_Key +'">'
								+ '<input type="hidden" id="DarlZins' + counter + '" value="' + daten.darl_zins +'">'
								+ '<input type="hidden" id="DarlZeit' + counter + '" value="' + daten.darl_zeit +'">'
								+ '<input type="hidden" id="AnlTyp' + counter + '" value="">'
								
								+'<div class="row uniform 50%">	<div class="12u 12u">'
								+ '<b>Moechten Sie in dieses Projekt investieren ?  </b></div></div>'
								+ '<div class="row uniform 50%">'
								
								+ '<div class="4u 12u"><input class="button alt small"type="number" id="AnlBetrag' + counter + '"	value="5000"  max="' + maxBetrag + '" placeholder="5000" "> '+ '</div>'
								+ '<div class="4u 12u">' + daten.anl_whrg  + ' anlegen  zu<input type="hidden" id="AnlWhrg' + counter + '" value="' + daten.anl_whrg   +'"></div>	'
								+ '<div class="2u 12u">	<input class="button alt small" type="number"  id="AnlZins' + counter + '" value="2" max="9" min="1" placeholder="2" ></div>'
								+ '<div class="2u 12u"> % Zins </div> </div>'	
								
								+ '<br><input class="button  fit small" type="submit" 	value="Jetzt Anlegen ?">'
								+' </form>' );
								
								
								AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-blue" style="width:'
									+ 	progangelegt + '%"> ' + finanziert + ' ' + daten.anl_whrg +'</div> </div>' ;
							
							} else { // if ( progangelegt < 100 ){
								var rest = (daten.darl_betrag - finanziert);				
								alert('Finanzierung abgeschlossen = '+ daten.obj_indexkey + '---' + rest + ' !!! ' );
								formsaveAnlage = '';
								AuctionProgress = '<br><div class="w3-progress-container w3-light-blue"><div id="myBar" class="w3-progressbar w3-blue" style="width:'
									+ 	progangelegt + '%"> ' + finanziert + ' ' + daten.anl_whrg +'</div> </div>' ;
							
					        }
							
							if(HP_Key  === null ) {formsaveAnlage = '';}
							
							var geb = new Date(daten.datum_geb);
					 		var gebyear = geb.getFullYear();
							var alteruser = year - gebyear ;
							// alert('alteruser = ' + alteruser);
							
							
							var flagge = '';
							switch (daten.obj_land) {
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
							
							var AuctionHead = ( '<span class="image featured align-center "><h2>' + daten.obj_land + ' ' + daten.obj_plz 	+ ' ' +  daten.obj_ort  + ' ' +  daten.obj_strasse + '</h2>' );
						   	    
						   // Bild Holen
							getPic(daten.obj_indexkey);
							
							// alert('in getLive = ' + image) ;
							var AuctionBild =  '<div class="w3-content w3-section " style="max-width: 500px">'  + image + '</div>' ; // class="pos_right"
								
							// alert('daten.indexkey = ' + daten.indexkey + '
							// daten.anl_indexkey = '
							// + daten.anl_indexkey) ;
							if (HP_Key == daten.anl_indexkey){
								// alert('daten.anl_objekt = ' +
								// daten.anl_objekt + '
								// daten.obj_indexkey = ' + daten.obj_indexkey)
								// ;
								if (daten.anl_objekt == daten.obj_indexkey)
					 			userangelegt = userangelegt + daten.anl_betrag ;
					 		}
					 		// alert('Sie habe in diesem Objekt ' + userangelegt
							// + ' ' +
							// daten.anl_whrg);
					 		 
							
							
							// $('.AuctionTable').html('<table><tr><td><ul>'
							AuctionTable = ('<table ><tr class="align-left"><td><ul>'			
								 + '<li>Objekt Wert: ' +  daten.obj_wert + ' ' + daten.obj_whrg  +' </li>'
								 +'<li>Belastung: ' + beleihung + '% </li>'
								 +'<li>Darlehen: ' + daten.darl_betrag + ' ' + daten.obj_whrg  +'</li>'
								 + '<li>Finanziert: ' + finanziert  + ' ' + daten.anl_whrg + '</li>'
								 + '<li>Zins: ' + daten.darl_zins + ' %  -  Laufzeit: ' + daten.darl_zeit + ' Monate </li>'
								+ '</ul></td><td><ul>'
								+ '<li>Baujahr: '+ daten.obj_baujahr +'</li>'
								+ '<li>Grundschuld: '+ daten.obj_schuld +'</li>'
								+' <li>Alter Darlehensnehmer: ' + alteruser +'</li>'
								+' <li>Netto Einkommen: ' + daten.darl_einkommen +'</li>' 	
								+' <li>Auszahlung Termin: ' + daten.darl_wunsch +'</li>' 
								+ ' </ul></td></tr><tr class="align-justify"><td colspan="2">' + daten.obj_text +'</td></tr>'
								
									+ '</td></tr></table>');
								
							// alert(AuctionHead + AuctuionBild +
							// AuctionProgress + AuctionTable);
						      allAuction =  allAuction  + (AuctionHead +  AuctionBild + '</span>	' +  AuctionProgress + AuctionTable + '<HR color="purple"  size="6" >') ;
							// $('.Auction').html(AuctionHead + AuctionBild +
							// '</span> ' + AuctionProgress + AuctionTable);
					 	
					 		$('.Auction').html(allAuction);
					 		userangelegt = 0 ; // loschen der Inhalte da sonnst
												// doppelt berechnet
					 	 	finanziert = 0 ;
					 	 	AuctionTable = '';
					}
			});
				
			},
			error : function() {
			// alert("error: profil.js = php/hypoDarlehen.php function=" + func
			// + "&indexkey=" + indexkey + "&obj_indexkey=" + obj_indexkey +
			// "&obj_text=" + obj_text);
				window.location.assign = "index.html#cta";
				
			}
		});
	
		
// einlesen der Dokumente zu dem Profil
function getPic(PHPstring){
	// alert('obj_typ - ' + Obj_typ + ' - ' + PHPstring) ;
	if (Obj_typ ===  'rend')
			{			
				var url = "../php/hypoRendite.php";
				var data = ("function=getRenditePic&rend_indexkey=" +  PHPstring )
				var savedir = '../uploads/' + PHPstring + '/' ;   	
	} else {
			
				var url = "../php/hypoAnlage.php" ;
				var data = ("function=getPic&obj_indexkey=" + PHPstring );
				var savedir = '../uploads/' + PHPstring.substring(0, 10) + '/' ;   	
			}
			
	// alert('savedir' + savedir );
		
	$.ajax({
				type : "get",
				url : url ,
				data : data  ,
				contentType : "application/json", // charset=utf-8", // Set
				dataType : 'json',
				jsonCallback : 'getJson',
			    async : false,
			    success: function(data) {
			    	$.each( data, function(counter, daten) {
			    		
			    // alert(daten.doc_name + ' ' + daten.doc_filename);
			    	
					if (daten.doc_filename === 'Bild'  || daten.doc_filename === 'RenditeBild' ) 
					{			
							var DocName = ('<a href="' + savedir  + daten.doc_name + '" target="_blank">' + daten.doc_name .substring(19, 50)+ ' </a>' );
							// nur 1
							
							image = '<img src="' + savedir + daten.doc_name + '">';
							// alle bilder augeben
							// image = image + '<img class="mySlides" src="' +
							// savedir +
							// daten.doc_name + '">';
					}
				 // alert(image) ;
			    	});
				},
				error : function(data, req, status, err) {
				alert('Something went wrong !!! getPic= ' + data + " req = " + req + " status = " + status + " err = " + err);
				// window.location = "error.html";
				}
	});
}		// ENDE einlesen der Bilder zur Auction
		

