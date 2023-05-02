// Api key
let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
// Variables
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var city = $("#city").val();
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var currentWeather = $("#currentWeather");
var forecast = $("#forecast");
var cityList = [];
var localCityList = JSON.parse(localStorage.getItem("cityList")) || [];
var localStorage = JSON.parse(localStorage.getItem("cityList")) || [];
var submitBtn = $("#submitBtn");


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
function localStorage() {
    localStorage.setItem("cityList", JSON.stringify(cityList));
}
// function to get data
async function getCoords(city) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
    const response = await fetch(geoURL);
    const data = await response.json();
}
// function to get forcast
async funtion getForcast(lat, lon, city,) {
    let forcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    const response = await fetch(forcastUrl);
    const data = await response.json();
    console.log(data);
}