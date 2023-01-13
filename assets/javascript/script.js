let lat;
let lon;
let searchedCity = "";


let currentCityName = document.querySelector('#currentCity');      // current city text area
let currentTemp = document.querySelector('#currentTemp');          // current temp text area
let currentHumidity = document.querySelector('#currentHumidity');  // current humidity text area



document.querySelector("#searchButton").addEventListener('click', function(e){
    console.log(document.querySelector("#searchText").value)
    searchedCity = document.querySelector("#searchText").value;




    var locationAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&appid=97a926960ee2c9606481892a903aa394`;

    fetch(locationAPI)
        .then(response =>{
            console.log("geo done")
            return response.json();
        })
        .then(data =>{
            lat = data[0].lat;
            lon = data[0].lon;
            console.log(lat)
        })
        .then(data =>{
            var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=97a926960ee2c9606481892a903aa394`;

            fetch(weatherAPI)
                .then(response =>{
                    console.log("weather done")
                    console.log(lat)
                    return response.json();
                })
                .then(data =>{
                    console.log(data)
                    console.log(data.city.name)
                    const cityName = data.city.name;          //selected city name
                    const humidity = data.list[0].humidity;   //selected city humidity
                    const kelvin = data.list[0].main.temp;      //selected city kelvin temp
                    let temp = Math.floor(((kelvin-273.15)*1.8)+32);  //convert kelvin to fahrenheit

                    currentCityName.textContent = `${cityName} ${moment().format('l')}`;
                    currentTemp.textContent = `Temp: ${temp}F`;
                    currentHumidity.textContent = humidity;
                    console.log("lat")
                })
        })
});        

// var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=44.9537&lon=-93.0900&appid=97a926960ee2c9606481892a903aa394`
// var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=97a926960ee2c9606481892a903aa394`;

// fetch(weatherAPI)
//     .then(response =>{
//         console.log("weather done")
//         console.log(lat)
//         return response.json();
//     })
//     .then(data =>{
//         console.log(data)
//         console.log(data.city.name)
//         const cityName = data.city.name;          //selected city name
//         const humidity = data.list[0].humidity;   //selected city humidity
//         const kelvin = data.list[0].main.temp;      //selected city kelvin temp
//         let temp = Math.floor(((kelvin-273.15)*1.8)+32);  //convert kelvin to fahrenheit

//         currentCityName.textContent = `${cityName} ${moment().format('l')}`;
//         currentTemp.textContent = `Temp: ${temp}F`;
//         currentHumidity.textContent = humidity;
//         console.log("lat")
//     })

