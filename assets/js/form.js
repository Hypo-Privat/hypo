var form = document.querySelector('#login_form');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	alert('form submitted');
}, false);

var submit_form_btn = document.querySelector('#submit_form');

submit_form_btn.addEventListener('click', function() {
	if (form.checkValidity()) {
		form.submit();
		var email = document.getElementById("email").value;
		alert('addEventListener true =  ' + email);
	} else {
		
		form.querySelector('input[type="submit"]').click();
	}
}, false);