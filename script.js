// Api key
// let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
let APIKey = "86dd1b60343c891737148e6032b4ab51";
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
const geoURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// fetch geo data
const response = await fetch(geoURL);
const geoData = await response.json();

lat = parseFloat(geoData.coord.lat);
lon = parseFloat(geoData.coord.lon);
console.log(lat, lon);
}


// function to get current weather
function displayCurrentWeather(lat, lon, city) {
    console.log("displayCurrentWeather");
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(currentWeatherURL)
        .then(function (response) {
            return response.json();
        }
        )
        .then(function (data) {
            console.log(data);
            let temp = convertion(data.list[0].main.temp);
            let wind = data.list[0].wind.speed;
            let humidity = data.list[0].main.humidity;
            //let uvIndex = data.current.uvi;
            let icon = data.list[0].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            let date = new Date(data.list[0].dt * 1000).toLocaleDateString("en-US");
            let currentWeather = $("#currentWeather"); 
            console.log("currentWeather line-82",);
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
            //currentWeatherDivUVIndex.text("UV Index: " + uvIndex);
            currentWeatherDivBody.append(currentWeatherDivTitle, currentWeatherDivIcon, currentWeatherDivTemp, currentWeatherDivWind, currentWeatherDivHumidity, currentWeatherDivUVIndex);
            currentWeatherDiv.append(currentWeatherDivBody);
            currentWeather.append(currentWeatherDiv);
            console.log("currentWeather line-108",);
        })
        .catch(function (error) {
            console.log("error", error);
            console.error(error);
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
    console.log(data.coord);
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    displayCurrentWeather(lat, lon, city);
    displayForecast();
    //displayUVIndex();
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
    //getCoords(city);
    //displayWeather();
    //displaySearchHistory();
}

addEventListener("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    cityList.push(city);
});

