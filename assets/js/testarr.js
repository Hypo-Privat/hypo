/* http://stackoverflow.com/questions/7545641/javascript-multidimensional-array

	
	var ObjektDoc = [ [], [] ];
	var erg = "";

	//var ObjektDoc = new Array();
	ObjektDoc[0][0] = 0;
	ObjektDoc[0][1] = "0doc_group";
	ObjektDoc[0][2] = "0doc_name";
	ObjektDoc[0][3] = "0doc_filename";

	ObjektDoc[1][0] = 1;
	ObjektDoc[1][1] = "1doc_group";
	ObjektDoc[1][2] = "1doc_name";
	ObjektDoc[1][3] = "1doc_filename";

	//outer loop applies to outer array
	for (var i = 0, len = ObjektDoc.length; i < len; i++) {
		// inner loop applies to sub-arrays
		for (var j = 0, len2 = ObjektDoc[i].length; j < len2; j++) {
			// accesses each element of each sub-array in turn
			erg += "Index " + j + ": ";
			erg += ObjektDoc[i][j] + "<br />";
			// console.log( ObjektDoc[i][j] ); 
		}
		// document.write(erg);
	}
	document.write(erg);

 */

// einlesen der Dokumente zu dem Profil
var HP_Key = window.localStorage.getItem('HP_Key');
var HP_Mail = window.localStorage.getItem('HP_Mail');
var HP_Titel = window.localStorage.getItem('HP_Titel');
var HP_Vorname = window.localStorage.getItem('HP_Vorname');
var HP_Nachname = window.localStorage.getItem('HP_Nachname');


var ObjektDoc = [ [],  [] ];
var erg = "";

var func = 'getDocs';
var PHPstring = ("function=" + func + "&HP_Key=" + HP_Key +'&DocGroup=O');
getDokumete(PHPstring);


function getDokumete(PHPstring){

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

										savedir = '../uploads/'
												+ daten.doc_indexkey + '/';
									
										//document.write(counter + " index "  + daten.doc_indexkey  + " -"  + daten.doc_filename + "<br />");
										//einfügen 	doc
										
										ObjektDoc[0][counter] = ( daten.doc_group + '-'  + daten.doc_filename  + '-' + savedir  + daten.doc_name );
										erg = ObjektDoc[0][counter] + "<br />";
										document.write(erg);
										 
										
									

									});

				},
				error : function(data, req, status, err) {
					alert('Something went wrong !!! get Docs = ' + data
							+ " req = " + req + " status = " + status
							+ " err = " + err);
					// window.location = "error.html";
				}
			});
}
