var APIKey 6baaab2eaf88f88a13344b8b2da0190e
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var city = $("#city").val();
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var currentWeather = $("#currentWeather");
var forecast = $("#forecast");
var cityList = [];
