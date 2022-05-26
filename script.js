const weatherApiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const gifApiKey = "aY5njGGdGK9pPmx5nPARWp7npLyt8QQy";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";

// DOM Constants
const mainContainerDiv = document.getElementById("main-container");
const headerDiv = document.getElementById("header");
const contentDiv = document.getElementById("content");

let weatherData;
let response;

const drawDom = () => {};

async function apiQuery(city) {
  response = await fetch(urlBegin + city + urlMiddle + weatherApiKey, {
    mode: "cors",
  });

  return await response.json();
}

async function getMain(city) {
  let data = await apiQuery(city);
  let tempK = data.main.temp;
  let tempC = Math.round((tempK - 273.15) * 100) / 100;
  let tempF = Math.round((tempC * (9 / 5) + 32) * 100) / 100;
  let mainWeather = data.weather[0].main;
  let description = data.weather[0].description;

  return data.main;
}
