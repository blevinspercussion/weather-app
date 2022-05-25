const apiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";

async function apiQuery(city) {
  const response = await fetch(urlBegin + city + urlMiddle + apiKey);
  const weatherData = await response.json();
  console.log(weatherData);
}

apiQuery("Seattle");
