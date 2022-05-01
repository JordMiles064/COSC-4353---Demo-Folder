/*
login.js:
	If username or password is missing:
		Show error message: "Username or password is required"
	Otherwise, if username is not found in persistent storage:
		Show error message: "Username does not exist. <a>Sign up</a> here!"
	Otherwise if password does not match username in persistent storage:
			Show error message, "Incorrect password."
	Otherwise:
		Log in.
*/

window.onload = () => {
    var loginForm = document.getElementById("loginForm");
	let formErrors = document.getElementById("formErrors");
	
	if(sessionStorage.getItem("FQSIGNUP_registerSuccess")){
		sessionStorage.removeItem("FQSIGNUP_registerSuccess");
		window.document.getElementById("signUpSuccess").innerHTML = "You've successfully registered! Please log in.";
	}

	loginForm.addEventListener('submit', (event) => {
		event.preventDefault();
		document.getElementById("signUpSuccess").innerHTML = "";
		
		let enteredUsername = document.getElementById("formFieldUsername").value;
		let enteredPassword = document.getElementById("formFieldPass").value;

		if(enteredUsername == "" || enteredPassword == ""){
			formErrors.innerHTML = "A Username and password is required."
		}

		axios.post('/login', {
			username: enteredUsername,
			password: enteredPassword
		}).catch( (error) => {
			formErrors.innerHTML = error.response.data.message;
		}).then((response) => {
			if(response){
				console.log(response);
				sessionStorage.setItem("FQSESSION_userID",response.data.ID);
				window.location = 'http://localhost:5000/mainmenu.html';
			}
		});
	});
};