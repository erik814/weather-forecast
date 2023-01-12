
var requestedAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid='

function getAPI(){
    fetch(requestedAPI)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
        })
        
        
}