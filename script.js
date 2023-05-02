let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var city = $("#city").val();
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var currentWeather = $("#currentWeather");
var forecast = $("#forecast");
var cityList = [];
var localCityList = JSON.parse(localStorage.getItem("cityList")) || [];
var localStorage = JSON.parse(localStorage.getItem("cityList")) || [];



function displayCurrentWeather() {
}

function displayForecast() {
}


function displaySearchHistory() {
}


function displayUVIndex() {
}

function displayWeather() {
    displayCurrentWeather();
    displayForecast();
    displayUVIndex();
}

function localStorage() {
    localStorage.setItem("cityList", JSON.stringify(cityList));
}

async function getCoords(city) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
    const response = await fetch(geoURL);
    const data = await response.json();
}