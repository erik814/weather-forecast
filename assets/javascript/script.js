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
    searchedCity = e.target.textContent
    runGeo();
});



//Pulls stored searched cities from storage and displays them under the search area
function pullFromStorage(){
    let citiesFromStorage = JSON.parse(localStorage.getItem("searchCity"));
    
    if(citiesFromStorage !== null){
        citiesFromStorage.forEach(function(city, index){
            let addedCity = document.createElement("p");
            addedCity.classList.add("addedCity");
            addedCity.textContent = city;
            document.getElementById("searchedHome").appendChild(addedCity);
        })
    }
};

//Saves the searched city to local storage
function saveToStorage(){
    citiesFromStorage.push(document.querySelector("#searchText").value);
    localStorage.setItem("searchCity", JSON.stringify(citiesFromStorage));
};

//displays latest searched city
function addCityTab(){
    let addedCity = document.createElement("p");
    addedCity.classList.add("addedCity");
    addedCity.textContent = document.querySelector("#searchText").value;
    document.getElementById("searchedHome").appendChild(addedCity);
};

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
            console.log(data)
            const cityName = data.city.name;          //selected city name
            const wind = data.list[0].wind.speed;     //selected city wind speed
            const humidity = data.list[0].main.humidity;   //selected city humidity
            const kelvin = data.list[0].main.temp;      //selected city kelvin temp
            let temp = Math.floor(((kelvin-273.15)*1.8)+32);  //convert kelvin to fahrenheit
            const iconCode = data.list[0].weather[0].icon;            //get icon code
            console.log(iconCode)
            const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            currentCityName.textContent = `${cityName} ${moment().format('l')}`;
            document.querySelector(".icon").src= iconURL;
            currentTemp.textContent = `Temp: ${temp}F`;
            currentWind.textContent = `Wind: ${wind}mph`;
            currentHumidity.textContent = `Humidity: ${humidity}%`;

            //clears the search text input after the APIs are done with it
            document.querySelector("#searchText").value = "";

            parseWeatherData(data.list);
        })
};


// Some of the below code was given by my teacher because open weather maps changed how they give the five day forecast
// I worked on it with some other students too

const fiveDaysOfWeather = [];
let currDTValue = moment().format("YYYY-MM-DD hh:mm:ss");
let newcurrDTValue = currDTValue.split(" ")[0];

function parseWeatherData(data){
    console.log(data.list)
    data.forEach(obj =>{

        const dateObj = moment(obj.dt_txt)
        const currday = dateObj._i;
        const newCurrDay = currday.split(" ")[0];

        if(newCurrDay !== newcurrDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find(day => day.dt_txt.split(" ")[0] === obj.dt_txt.split(" ")[0])){
            currDTValue = newCurrDay;
            fiveDaysOfWeather.push(obj);
        }

        if(newCurrDay !== currDTValue && fiveDaysOfWeather.length < 5 && !fiveDaysOfWeather.find(day => day.dt_txt === obj.dt)){
            currDTValue = newCurrDay;
        }
    })

    console.log(fiveDaysOfWeather)
    populate5dayForecast();
};

function populate5dayForecast(){
    console.log("hey");

    fiveDaysOfWeather.forEach(function(object, index){

        let i = (index+1);
        console.log(document.querySelector(`.day${i}Humidity`).textContent)

        let kelvin = object.main.temp;
        let dayItemp = Math.floor(((kelvin-273.15)*1.8)+32)
        let dayIwind = object.wind.speed;
        let dayIhumidity = object.main.humidity;
        // let iconCode = object.weather[0].icon;
        // console.log(iconCode)
        // let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

        let dayItempText = document.querySelector(`.day${i}Temp`);
        let dayIiconText = document.querySelector(`day${i}icon`)
        let dayIwindText = document.querySelector(`.day${i}wind`);
        let dayIhumidityText = document.querySelector(`.day${i}Humidity`);


        dayItempText.textContent = `Temp: ${dayItemp}F`;
        // dayIiconText.src = iconURL;
        dayIwindText.textContent = `Wind: ${dayIwind} MPH`;
        dayIhumidityText.textContent = `Humidity: ${dayIhumidity}%`;

        console.log(dayIhumidity);


    })
}