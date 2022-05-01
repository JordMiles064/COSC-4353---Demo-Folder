let fullName;
let address1;
let address2;
let city;
let state;
let zip;
let form;
let errorElement;

let userInfoObj = null;

window.onload = () => {
    fullName = document.getElementById('name')
    address1 = document.getElementById('address1')
    address2 = document.getElementById('address2')
    city = document.getElementById('city')
    state = document.getElementById('state')
    zip = document.getElementById('zip')
    form = document.getElementById('profileManagementForm')
    errorElement = document.getElementById('error')

    axios.post('/getInfoObj', {
        ID: sessionStorage.getItem("FQSESSION_userID")
    }).catch( (error) => {
        console.log(error);
    }).then((response) => {
        if(response){
            console.log("User info data found: ");
            console.log(response);

            userInfoObj = response.data;
            console.log(userInfoObj);

            let inputs = {
                fullName: fullName.value,
                address1: address1.value,
                address2: address2.value,
                city: city.value,
                state: state.value,
                zipcode: zip.value
            };
            
            if(userInfoObj){
                console.log("Populating field inputs with userInfoObj key values...");

                for(key of Object.keys(inputs)){
                    if(inputs[key] == ""){
                        if(userInfoObj[key] && userInfoObj[key] != ""){
                            inputs[key] = userInfoObj[key];
                        }
                    }
                }
            }

            fullName.value = inputs.fullName;
            address1.value = inputs.address1;
            address2.value = inputs.address2;
            city.value = inputs.city;
            state.value = inputs.state;
            zip.value = inputs.zipcode;
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        let messages = []
        if (fullName.value === '' || fullName.value == null) {
            messages.push('Name is required')
        }
    
        if (address1.value === '' || address1.value == null) {
            messages.push('Address is required')
        }
    
        if (city.value === '' || city.value == null) {
            messages.push('City is required')
        }
    
        if (state.value === '' || state.value == null) {
            messages.push('State is required')
        }
    
        if (zip.value === '' || zip.value == null) {
            messages.push('Zipcode is required')
        }
    
        if (fullName.value.length > 50) {
            messages.push('Name can not be longer than 50 characters')
        }
    
        if (address1.value.length > 100) {
            messages.push('Address 1 can not be longer than 100 characters')
        }
    
        if (address2.value.length > 100) {
            messages.push('Address 2 can not be longer than 100 characters')
        }
    
        if (city.value.length > 100) {
            messages.push('City can not be longer than 100 characters')
        }
    
        if (zip.value.length < 5 || zip.value.length > 9) {
            messages.push('Zipcode must contain 5 to 9 digits')
        }
    
        if (isNaN(zip.value)) {
            messages.push('Zipcode must contain only numbers')
        }
    
        if (messages.length > 0) {
            errorElement.innerText = messages.join(', ')
        } else {
            //Submit data to database
    
            const submit = {
                ID: sessionStorage.getItem("FQSESSION_userID"),
                fullName: fullName.value,
                address1: address1.value,
                address2: address2.value,
                city: city.value,
                state: state.value,
                zipcode: zip.value
            };
    
            console.log("Submit");
    
            axios.post('/submitClientInfo',submit).catch( (error) => {
                console.log(error);
            }).then((response) => {
                if(response){
                    console.log(response);
                }
            });
        }
    });
}