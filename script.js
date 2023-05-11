// Api key
let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
// Variables
var requestUrl; 
var responseText = document.querySelector('#response-text');
var inputval = document.querySelector('#cityinput')
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var city;
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var currentWeather = $("#currentWeather");
var displayUVIndex = $("#displayUVIndex");
var forecast = $("#forecast");
var cityList = [];
var localCityList = JSON.parse(localStorage.getItem("cityList")) || [];
var localStorage = JSON.parse(localStorage.getItem("cityList")) || [];
var submitBtn = $("#submitBtn");
function convertion(val)
{
    return (val - 273).toFixed(2);
}

function getApi(requestUrl) {
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }})}
            

searchBtn.on("click", function (event) {
    console.log("click");
    event.preventDefault();
    city = $("#city").val();
    requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
   getApi(requestUrl);
});


async function getCoords(city) {
const geoURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + OpenWeatherAPIKey;
// fetch geo data
const response = await fetch(geoURL);
const geoData = await response.json();

lat = parseFloat(geoData.coord.lat);
lon = parseFloat(geoData.coord.lon);
console.log(lat, lon);
}


// function to get current weather
function displayCurrentWeather() {
}
// function to get forecast
function displayForecast() {
}

// function to get search history
function displaySearchHistory() {
}

// function to get UV index
function displayUVIndex() {
}
// function to get weather
function displayWeather() {
    displayCurrentWeather();
    displayForecast();
    displayUVIndex();
}
// function to store data
function localCityList () {
    localStorage.setItem("cityList", JSON.stringify(cityList));
}
// function to get data
async function getCoords(city) {
    const geoURL = queryURL
    const response = await fetch(geoURL);
    const data = await response.json();
}
// function to get forcast
function displayForecast() { 
    var city = $("#city").val();
    cityList.push(city);
    localStorage.setItem("cityList", JSON.stringify(cityList));
    getCoords(city);
    displayWeather();
    displaySearchHistory();
}

addEventListener("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    cityList.push(city);
});

