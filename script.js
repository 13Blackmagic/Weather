// Api key
let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
// Variables
var city = document.querySelector('#city').value;
var error = document.querySelector('#error');
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
var lat, lon;
function convertion(val)
{
    return (val - 273).toFixed(2);
}

function getApi(requestUrl) {
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            console.log("response.= ",response);
            return response.json();
        })
        .then(function (data) {
            console.log("data= ", data);
                    console.log("data= ", data);
                    displayWeather(data, city);
                })
                .catch(function (error) {
                console.error(error);
            });
        }

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
function displayCurrentWeather(lat, lon, city) {
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + OpenWeatherAPIKey;
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        }
        )
        .then(function (data) {
            console.log(data);
            let temp = convertion(data.current.temp);
            let wind = data.current.wind_speed;
            let humidity = data.current.humidity;
            let uvIndex = data.current.uvi;
            let icon = data.current.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            let date = new Date(data.current.dt * 1000).toLocaleDateString("en-US");
            let currentWeather = $("#currentWeather");
            currentWeather.empty();
            let currentWeatherDiv = $("<div>");
            currentWeatherDiv.addClass("card");
            let currentWeatherDivBody = $("<div>");
            currentWeatherDivBody.addClass("card-body");
            let currentWeatherDivTitle = $("<h5>");
            currentWeatherDivTitle.addClass("card-title");
            currentWeatherDivTitle.text(city + " (" + date + ")");
            let currentWeatherDivIcon = $("<img>");
            currentWeatherDivIcon.attr("src", iconURL);
            let currentWeatherDivTemp = $("<p>");
            currentWeatherDivTemp.addClass("card-text");
            currentWeatherDivTemp.text("Temperature: " + temp + " °C");
            let currentWeatherDivWind = $("<p>");
            currentWeatherDivWind.addClass("card-text");
            currentWeatherDivWind.text("Wind Speed: " + wind + " MPH");
            let currentWeatherDivHumidity = $("<p>");
            currentWeatherDivHumidity.addClass("card-text");
            currentWeatherDivHumidity.text("Humidity: " + humidity + "%");
            let currentWeatherDivUVIndex = $("<p>");
            currentWeatherDivUVIndex.addClass("card-text");
            currentWeatherDivUVIndex.text("UV Index: " + uvIndex);
            currentWeatherDivBody.append(currentWeatherDivTitle, currentWeatherDivIcon, currentWeatherDivTemp, currentWeatherDivWind, currentWeatherDivHumidity, currentWeatherDivUVIndex);
            currentWeatherDiv.append(currentWeatherDivBody);
            currentWeather.append(currentWeatherDiv);
        });
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
function displayWeather(data, city) {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    displayCurrentWeather(lat, lon, city);
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

