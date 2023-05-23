// Api key
// let APIKey = "6baaab2eaf88f88a13344b8b2da0190e";
let APIKey = "86dd1b60343c891737148e6032b4ab51";
// Variables
const weatherContainer = document.querySelector('#weather-container');
const cityContainer = document.querySelector('#city-container');
const iconURLContainer = document.querySelector('#iconURL-container');
const tempContainer = document.querySelector('#temp-container');
const windContainer = document.querySelector('#wind-container');
const humidityContainer = document.querySelector('#humidity-container');
const uvContainer = document.querySelector('#uv-container');
const urlContainer = document.querySelector('#url-container');
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

function getApi(requestUrl) { // function to get api
    console.log(requestUrl); 
    fetch(requestUrl) // fetch api
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
// onece the search button is clicked than the function will run
searchBtn.on("click", function (event) { 
    console.log("click");
    event.preventDefault();
    city = $("#city").val();
    requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
   getApi(requestUrl);
});

// function to get the coordinates for the city that was searched
async function getCoords(city) {
const geoURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// fetch geo data
const response = await fetch(geoURL);
const geoData = await response.json();
// spacific location latatude and longitude
lat = parseFloat(geoData.coord.lat);
lon = parseFloat(geoData.coord.lon);
console.log(lat, lon);
}


// function to display current weather
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
            let wind = data.list[0].wind.speed; // wind speed
            let humidity = data.list[0].main.humidity; // humidity
            //let uvIndex = data.current.uvi;
            let icon = data.list[0].weather[0].icon; // icon for weather
            let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            let date = new Date(data.list[0].dt * 1000).toLocaleDateString("en-US"); // the date of the currant weather
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
            currentWeatherDivTemp.text("Temperature: " + temp + " °F");
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

        function convertion(temp) {
            return Math.floor((temp - 273.15) * 1.8 + 32);
        }
}
// function to get forecast
function displayForecast() {

}

// function to get search history
function displaySearchHistory() {
    console.log("displaySearchHistory");
    let searchHistory = $("#searchHistory");
    searchHistory.empty();
    let searchHistoryDiv = $("<div>");
    searchHistoryDiv.addClass("card");
    let searchHistoryDivBody = $("<div>");
    searchHistoryDivBody.addClass("card-body");
    let searchHistoryDivTitle = $("<h5>");
    searchHistoryDivTitle.addClass("card-title");
    searchHistoryDivTitle.text("Search History");
    searchHistoryDivBody.append(searchHistoryDivTitle);
    searchHistoryDiv.append(searchHistoryDivBody);
    searchHistory.append(searchHistoryDiv);
    for (let i = 0; i < cityList.length; i++) {
        let searchHistoryDivBodyItem = $("<p>");
        searchHistoryDivBodyItem.addClass("card-text");
        searchHistoryDivBodyItem.text(cityList[i]);
        searchHistoryDivBody.append(searchHistoryDivBodyItem);
    }
    searchHistoryDiv.append(searchHistoryDivBody);
    searchHistory.append(searchHistoryDiv);
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
    //displayUVIndex();
}
// function to store data
function localCityList () {
    localStorage.setItem("cityList", JSON.stringify(cityList));
    console .log("localCityList", cityList);
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
    localCityList();
    

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var forecast = response.list;
        console.log(forecast);
        var day = 1;
        for (var i = 0; i < forecast.length; i++) {
            var date = forecast[i].dt_txt.split(" ")[0];    
            var time = forecast[i].dt_txt.split(" ")[1];
            if (time === "15:00:00") {
                var temp = forecast[i].main.temp;
                var humidity = forecast[i].main.humidity;
                var icon = forecast[i].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
                var dateDiv = $("<div>");
                dateDiv.addClass("card");
                var dateDivBody = $("<div>");
                dateDivBody.addClass("card-body");
                var dateDivTitle = $("<h5>");
                dateDivTitle.addClass("card-title");
                dateDivTitle.text(city + " (" + date + ")");
                var dateDivIcon = $("<img>");
                dateDivIcon.attr("src", iconURL);
                var dateDivTemp = $("<p>");
                dateDivTemp.addClass("card-text");
                dateDivTemp.text("Temperature: " + temp + " °F");
                var dateDivHumidity = $("<p>");
                dateDivHumidity.addClass("card-text");
                dateDivHumidity.text("Humidity: " + humidity + "%");
                dateDivBody.append(dateDivTitle, dateDivIcon, dateDivTemp, dateDivHumidity);
                dateDiv.append(dateDivBody);
                $("#forecast" + day).html(dateDiv); 
                day++;
            }
        }
    });
}



addEventListener("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    cityList.push(city);
});

