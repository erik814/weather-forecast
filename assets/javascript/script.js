let lat = 44.9479;
let lon = -93.0873;

let currentCityName = document.querySelector('#currentCity');      // current city text area
let currentTemp = document.querySelector('#currentTemp');          // current temp text area
let currentHumidity = document.querySelector('#currentHumidity');  // current humidity text area


var requestedAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=97a926960ee2c9606481892a903aa394`

fetch(requestedAPI)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        console.log(data)
        console.log(data.city.name)
        const cityName = data.city.name;          //selected city name
        const temp = data.list[0].main.temp;      //selected city temp
        const humidity = data.list[0].humidity;   //selected city humidity

        currentCityName.textContent = cityName;
        currentTemp.textContent = temp;
        currentHumidity.textContent = humidity;

    })