					
// Ausgabe UPDATE User  Profile
$('#UpdateUser').on("pageshow", function() {
	//alert(" index: " + (daten.INDEXKEY));
	var UserKey = window.localStorage.getItem('UserKey');
	//alert(" #UpdateUser " + UserKey);
	$.getJSON('php/tJamContacts.php?function=getUserDetail&INDEXKEY=' + UserKey, function(data) {
		$.each(data, function(counter, daten) {
			// alert(" index: " + (daten.REMINDME));

			var UserData = '<h2>Hello ' + daten.FIRSTNAME + ' ' + daten.LASTNAME + '</h2><p>Here you can update your User Profile.  If you provide exact information, we can deliver a professional correct service.</p>';
			$(UserData).appendTo('#UserDetailHead');
			//alert(" #UserData " + UserData);
			// eventuell aufteilen in 3 teile
			$('#UserDetail').html('<p>' 
			+ ' <label for="COMPANYNAME">Company</label><input data-mini="true" type="text" name="COMPANYNAME" id="COMPANYNAME" value="' + daten.COMPANYNAME + '" />' 
 			+ '<label for="FIRSTNAME">Firstname</label><input data-mini="true" type="text" name="FIRSTNAME" id="FIRSTNAME" value="' + daten.FIRSTNAME + '"  />' 
			+ '<label for="LASTNAME">Lastname</label><input data-mini="true" type="text" name="LASTNAME" id="LASTNAME" value="' + daten.LASTNAME + '"  />'
			+ '<label for="ADDRESS">Address</label><input data-mini="true" type="text" name="ADDRESS" id="ADDRESS" value="' + daten.ADDRESS + '" />' 
			+ '<label for="ADDRESSNUMBER">Number</label><input data-mini="true" type="text" name="ADDRESSNUMBER" id="ADDRESSNUMBER" value="' + daten.ADDRESSNUMBER + '"/>' 
			+ '<label for="POSTALCODE">Postalcode</label><input data-mini="true" type="text" name="POSTALCODE" id="POSTALCODE" value="' + daten.POSTALCODE + '" />' 
			+ '<label for="CITY">City</label><input data-mini="true" type="text" name="CITY" id="CITY" value="' + daten.CITY + '" />' 
			+ '<label for="STATEPROVINCE">Province</label><input data-mini="true" type="text" name="STATEPROVINCE" id="STATEPROVINCE" value="' + daten.STATEPROVINCE + '" />' 
			+ '<label for="COUNTRY1">Country</label><input data-mini="true" type="text" name="COUNTRY1" id="COUNTRY1" value="' + daten.COUNTRY + '" />' 
	 		+ '<label for="REMINDME">Remind Me</label><select data-mini="true" name="REMINDME" id="REMINDME"><option value="'+ daten.REMINDME +'">'+ daten.REMINDME +'</option><option value="J">Yes please</option><option value="N">No thank you</option></select>' 
			+ '<label for="BIRTHDATE">Birthdate</label><input data-mini="true" type="date" name="BIRTHDATE" id="BIRTHDATE"  min="1930-01-01"value="' + daten.BIRTHDATE + '"/>' 
			+ '<label for="LANG">Language</label><input data-mini="true" type="text" name="LANG" id="LANG" value="' + daten.LANG + '" />' 
			+ '<label for="URL">Your Homepage</label><input data-mini="true"type="url" name="URL" id="URL" value="' + daten.URL + '"  />' 
			+ '</p>');
			
		

			//Formdaten an PHP-Datei senden
			$("form#UserUpdate").submit(function() {
				// we want to store the values from the form input box, then send via ajax below

				//alert("UserUpdate Form");
				var COMPANYNAME = $('#COMPANYNAME').attr('value');
				var FIRSTNAME = $('#FIRSTNAME').attr('value');
				var LASTNAME = $('#LASTNAME').attr('value');
				var ADDRESS = $('#ADDRESS').attr('value');
				var ADDRESSNUMBER = $('#ADDRESSNUMBER').attr('value');
				var POSTALCODE = $('#POSTALCODE').attr('value');
				var CITY = $('#CITY').attr('value');
				var STATEPROVINCE = $('#STATEPROVINCE').attr('value');
				var COUNTRY = $('#COUNTRY1').attr('value');
				var REMINDME = $('#REMINDME').attr('value');
				var BIRTHDATE = $('#BIRTHDATE').attr('value');
				var LANG = $('#LANG').attr('value');
				var URL = $('#URL').attr('value');

				alert("function=userUpdate&INDEXKEY=" + UserKey + "&COMPANYNAME=" + COMPANYNAME + "&FIRSTNAME=" + FIRSTNAME + "&ADDRESS=" + ADDRESS + "&ADDRESSNUMBER=" + ADDRESSNUMBER + "&POSTALCODE=" + POSTALCODE + "&CITY=" + CITY + "&STATEPROVINCE=" + STATEPROVINCE + "&COUNTRY=" + COUNTRY + "&REMINDME=" + REMINDME + "&BIRTHDATE=" + BIRTHDATE + "&LANG=" + LANG + "&URL=" + URL);
				$.ajax({
					type : "get",
					url : "php/tJamContacts.php",
					data : "function=userUpdate&INDEXKEY=" + UserKey + "&COMPANYNAME=" + COMPANYNAME + "&FIRSTNAME=" + FIRSTNAME + "&LASTNAME=" + LASTNAME + "&ADDRESS=" + ADDRESS + "&ADDRESSNUMBER=" + ADDRESSNUMBER + "&POSTALCODE=" + POSTALCODE + "&CITY=" + CITY + "&STATEPROVINCE=" + STATEPROVINCE + "&COUNTRY=" + COUNTRY + "&REMINDME=" + REMINDME + "&BIRTHDATE=" + BIRTHDATE + "&LANG=" + LANG + "&URL=" + URL,
					success : function() {
						$.mobile.changePage("#map", {
							transition : "flip"
						});
						//     error:  alert('login error you have an account ? Register NEW ; ');
					}
				});
				return false;
			});

		});
	});

});

// Schliessen Detail Ausgabe
$('#UpdateUser').on("pagehide", function() {
	$('#UserDetailHead').empty();
});
