var form = document.querySelector('#kontakt');

function kontaktmail() {

	//alert("kontaktmail = ");

	var func = document.getElementById("func").value;
	var titel = document.getElementById("titel").value;
	var name = document.getElementById("name").value;
	var vorname = document.getElementById("vorname").value;

	var sprache = document.getElementById("sprache").value;

	var mail = document.getElementById("mail").value;
	var tel = document.getElementById("tel").value;
	var message = document.getElementById("message").value;

	//alert("function=" + func + "&titel=" + titel + "&name=" + name + "&vorname="
	//		+ vorname  + "&sprache=" + sprache	+ "&mail=" + mail + "&tel=" + tel + "&message=" + message);

	
	 dataString = encodeURI ("function=" + func + "&titel=" + titel + "&name=" + name + "&vorname="
				+ vorname  + "&sprache=" + sprache 	+ "&mail=" + mail + "&tel=" + tel + "&message=" + message);
	 
	$.ajax({
		type : "get",
		url : "../php/hypoUser.php",
		data : dataString ,
		contentType : "application/json", // charset=utf-8", // Set
		dataType : 'json',
		jsonCallback : 'getJson',
	    async : false,
		success : function() {
			//alert("success : function() ="); Danke für ihre Nachricht !
			window.location= "dankeContact.html";
			
		},
		error : function() {
			alert("error: function() = ");
			window.location = "index.html#cta";			
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
