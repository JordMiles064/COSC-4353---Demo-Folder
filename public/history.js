window.onload = () => {
    let data = [];

    axios.post('/getQuoteList', {
        ID: sessionStorage.getItem("FQSESSION_userID")
    }).catch( (error) => {
        console.log(error);
    }).then((response) => {
        if(response.data){
            for(quote of response.data){
                console.log(quote);
                data.push(quote);
            }

            let body = document.querySelector(".rows");
            
            for (rowInfo of data){
                let row = document.createElement("tr");
        
                let td = document.createElement("td");
                td.innerHTML = rowInfo.gallonsRequested;
                row.appendChild(td);
            
                td = document.createElement("td");
                td.innerHTML = rowInfo.deliveryAddress;
                row.appendChild(td);
            
                td = document.createElement("td");
                td.innerHTML = rowInfo.deliveryDate;
                row.appendChild(td);
            
                td = document.createElement("td");
                td.innerHTML = rowInfo.pricePerGallon;
                row.appendChild(td);
            
                td = document.createElement("td");
                td.innerHTML = rowInfo.amountDue;
                row.appendChild(td);
            
                body.appendChild(row);
            }
        }
    });
}