//Pricing module class that will be used later
/*
class PricingModule {

}

//EDIT: Empty pricing module moved to routes/PricingModule.js
*/


window.onload = () => {
  const gallonsRequested = document.getElementById('gallonsReq');
  const deliveryAddress = document.getElementById('DelAddress');
  const deliveryCity = document.getElementById('DelCity');
  const deliveryState = document.getElementById('DelState');
  const deliveryZip = document.getElementById('DelZip');
  const deliveryDate = document.getElementById('delDate');
  const pricePerGallon = document.getElementById('price');
  const totalEstimate = document.getElementById('total');

  let date = new Date();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let year = date.getFullYear();
  date = year + '-' + month + '-' + day;

  deliveryDate.value = date;

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

          
          if(userInfoObj){
              console.log("Populating field inputs with userInfoObj key values...");
              
              if(userInfoObj.address1 && userInfoObj.address2 && userInfoObj.address1 != ""){
                deliveryAddress.value = userInfoObj.address1 + " " + userInfoObj.address2;
              } else if(userInfoObj.address1 && userInfoObj.address1 != ""){
                deliveryAddress.value = userInfoObj.address1;
              }
              if(userInfoObj.city){
                deliveryCity.value = userInfoObj.city
              }
              if(userInfoObj.state){
                deliveryState.value = userInfoObj.state;
              }
              if(userInfoObj.zipcode){
                deliveryZip.value = userInfoObj.zipcode;
              }
          }
      }
  });

  document.getElementById("calculateButton").addEventListener('click', (event) => {
    event.preventDefault();

    var value = gallonsRequested.value;
    if (value === '') {
        alert('You must request an amount of gallons to submit a fuel quote.');
        return;
    }

    var value = totalEstimate.value;
    if (value === '') {
        alert('You must calculate an estimate before submitting a fuel quote.');
        return;
    }

    if (deliveryAddress.value === '' && deliveryCity.value === '' && deliveryState.value === '' && deliveryZip.value === '') {
        alert('Please enter some sort of address by going to the profile edit menu before submitting a fuel quote.');
        return;
    }

    if (deliveryDate.value === '') {
      alert('Please select a date for the delivery to take place.');
      return;
  }

    let submit = {
      ID: sessionStorage.getItem("FQSESSION_userID"),
      gallonsRequested:  gallonsRequested.value,
      deliveryAddress: deliveryAddress.value + ", " + deliveryCity.value + " " + deliveryState.value + " " + deliveryZip.value,
      deliveryDate: deliveryDate.value,
      pricePerGallon: pricePerGallon.value,
      amountDue: totalEstimate.value
    };

    axios.post('/submitFuelQuote',submit).catch( (error) => {
      console.log(error);
    }).then((response) => {
      if(response){
        console.log(response);
      }
    });
  });

  document.getElementById("submitGallons").addEventListener('click', (event) => {
    event.preventDefault();

    var value = gallonsRequested.value;
    if (value === '') {
        alert('Please enter an amount of gallons before calculating your estimate.');
        return;
    }

    axios.post('/calcFuelQuote',
      {
        ID: sessionStorage.getItem("FQSESSION_userID"),
        gallonsRequested: value,
        inState: deliveryState.value == "TX",
        pricePerGallon: pricePerGallon.value
      }
    ).catch( (error) => {
      console.log(error);
    }).then((response) => {
      if(response){
        console.log(response);
        totalEstimate.value = response.data.total;
      }
    });
  });
}