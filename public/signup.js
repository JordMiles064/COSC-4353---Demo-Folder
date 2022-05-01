window.onload = function () {
    var signUpForm = document.getElementById("signUpForm");

	signUpForm.addEventListener('submit', (event) => {
		// stop form submission
		event.preventDefault();
		let formErrors = document.getElementById("formErrors");
		formErrors.style.display = "none";
		
		let list = document.querySelectorAll(".formField");
		for(let e of list){
			e.style.border = "1px solid #aaa";
		}
	   
		let errors = [];
		
		let username = document.getElementById("username");
		let pass = document.getElementById("password");
		let passConfirm = document.getElementById("repeatpass");
		
		if(username.value.length < 1){
			errors.push({
				errorMessage: "Username is missing.",
				errorElement: username
			});
		}
		if(pass.value.length < 8){
			errors.push({
				errorMessage: "Password must be greater than 8 characters.",
				errorElement: pass
			});
		}
		if(!pass.value.match(/(?=.*[a-z])/)){
			errors.push({
				errorMessage: "Password must contain at least one lowercase character.",
				errorElement: pass
			});
		}
		if(!pass.value.match(/(?=.*[A-Z])/)){
			errors.push({
				errorMessage: "Password must contain at least one uppercase character.",
				errorElement: pass
			});
		}
		if(!pass.value.match(/(?=.*[0-9])/)){
			errors.push({
				errorMessage: "Password must contain at least one digit.",
				errorElement: pass
			});
		}
		if(!pass.value.match(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)){
			errors.push({
				errorMessage: "Password must contain at least one special character.",
				errorElement: pass
			});
		}
		if(pass.value != passConfirm.value){
			errors.push({
				errorMessage: "Passwords don't match.",
				errorElement: passConfirm
			});
		}
		
		if(errors.length > 0){
			formErrors.style.display = "block";
			let errorString = "<ul>"
			
			for(let e of errors){
				errorString += "<li>";
				errorString += e.errorMessage;
				errorString += "</li>";
				
				e.errorElement.style.border = "2px solid red";
			}
			
			errorString += "</ul>"
			formErrors.innerHTML = errorString;
		} else {
			event.preventDefault();
			
			const values = {
				ID: username.value,
				password: pass.value
			};
			console.log(values);
			
			axios.post('/register',values).catch( (error) => {
				formErrors.style.display = "block";
				formErrors.innerHTML = "Username already exists! <a href='http://localhost:5000/index.html'>Log in</a> here.";
			}).then((response) => {
				if(response){
					console.log(response);
					sessionStorage.setItem("FQSIGNUP_registerSuccess",true);
					window.location = 'http://localhost:5000/index.html';
				}
			});
		}
	});
};