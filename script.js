const apiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";

let weatherData;
let response;

async function apiQuery(city) {
  response = await fetch(urlBegin + city + urlMiddle + apiKey, {
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
  console.log(data);
  console.log(tempK + "K");
  console.log(tempC + "C");
  console.log(tempF + "F");
  console.log(mainWeather);
  console.log(description);
}

getMain("Birmingham");
