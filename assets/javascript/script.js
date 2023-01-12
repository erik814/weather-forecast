
var requestedAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=AIzaSyCNObXL6jFu5TPmNSjZxxhTOHgzCL0l4TI'

function getAPI(){
    fetch(requestedAPI)
        .then{
            console.log('got it')
        }
}