let lat;
let lon;

let currentCityName = document.querySelector('#currentCity');      // current city text area
let currentTemp = document.querySelector('#currentTemp');          // current temp text area
let currentHumidity = document.querySelector('#currentHumidity');  // current humidity text area

let searchedCity = "";
savedCities = [];
citiesFromStorage = [];

pullFromStorage();

//search button click event
document.querySelector("#searchButton").addEventListener('click', function(e){
    searchedCity = document.querySelector("#searchText").value;
    runGeo();
    saveToStorage();
    addCityTab();
}); 

// previously searched cities click event
document.querySelector('#searchedHome').addEventListener('click', function(e){
    console.log(e.target.textContent)
    searchedCity = e.target.textContent
    runGeo();
})



//Pulls stored searched cities from storage and displays them under the search area
function pullFromStorage(){
    let citiesFromStorage = JSON.parse(localStorage.getItem("searchCity"));
    
    citiesFromStorage.forEach(function(city, index){
        let addedCity = document.createElement("p");
        addedCity.classList.add("addedCity");
        addedCity.textContent = city;
        document.getElementById("searchedHome").appendChild(addedCity);
    })
}

//Saves the searched city to local storage
function saveToStorage(){
    citiesFromStorage.push(document.querySelector("#searchText").value);
    localStorage.setItem("searchCity", JSON.stringify(citiesFromStorage));
}

//displays latest searched city
function addCityTab(){
    let addedCity = document.createElement("p");
    addedCity.classList.add("addedCity");
    addedCity.textContent = document.querySelector("#searchText").value;
    document.getElementById("searchedHome").appendChild(addedCity);
}

//Finds the latitude and longitude of the searched city
function runGeo(){
    // searchedCity = document.querySelector("#searchText").value;
    var locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=97a926960ee2c9606481892a903aa394`;

    fetch(locationAPI)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            lat = data[0].lat;
            lon = data[0].lon;
            runWeather();
        })
};

// Retrieves the weather data for the given latitude and longitude
function runWeather(){
    var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=97a926960ee2c9606481892a903aa394`;

    fetch(weatherAPI)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            const cityName = data.city.name;          //selected city name
            const wind = data.list[0].wind.speed;     //selected city wind speed
            const humidity = data.list[0].main.humidity;   //selected city humidity
            const kelvin = data.list[0].main.temp;      //selected city kelvin temp
            let temp = Math.floor(((kelvin-273.15)*1.8)+32);  //convert kelvin to fahrenheit

            currentCityName.textContent = `${cityName} ${moment().format('l')}`;
            currentTemp.textContent = `Temp: ${temp}F`;
            currentWind.textContent = `Wind: ${wind}mph`;
            currentHumidity.textContent = `Humidity: ${humidity}%`;

            //clears the search text input after the APIs are done with it
            document.querySelector("#searchText").value = "";
            // parseWeatherData(data)
        })
}
