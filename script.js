// Api key
let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
// Variables
var inputval = document.querySelector('#cityinput')
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var city = $("#city").val();
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var currentWeather = $("#currentWeather");
var displayUVIndex = $("#displayUVIndex");
var forecast = $("#forecast");
var cityList = [];
var localCityList = JSON.parse(localStorage.getItem("cityList")) || [];
var localStorage = JSON.parse(localStorage.getItem("cityList")) || [];
var submitBtn = $("#submitBtn");


fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+APIKey)
.then(response => response.json())

.then(data => {
    var nameValue = data['name'];
    var descrip= data['weather'][0]['description'];
    var temp = data['main']['temp'];
    var windspd = data['wind']['speed'];
    city.innerHTML='Weather of <span>${nameValue}</span>';
    temp.innerTHML = 'Temperature: <span>${temp}</span>';
    descrip.innerHTML = 'Description: <span>${descrip}</span>';
    wind.innerHTML = 'Wind Speed: <span>${windspd}</span>';

})

.catch(err => alert("Wrong city name!"));


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





addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    getCoords(city);
    localStorage();
    displayWeather();
    displaySearchHistory();
}
);
