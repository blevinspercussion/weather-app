const weatherApiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const gifApiKey = "aY5njGGdGK9pPmx5nPARWp7npLyt8QQy";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";
const weatherImageUrl = "http://openweathermap.org/img/wn/";
const geoCodeUrlBegin = "http://api.openweathermap.org/geo/1.0/direct?q=";
const geoCodeUrlMiddle = "&limit=1&appid=";

// DOM Constants
const mainContainerDiv = document.getElementById("main-container");
const headerDiv = document.getElementById("header");
const contentDiv = document.getElementById("content");
const weatherDiv = document.getElementById("weather-div");
const formDiv = document.getElementById("form-div");

let weatherData;
let response;
let city = "Birmingham";

function clearDiv(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

// Module to control weather card
const weatherCardController = (() => {
  const drawWeatherCard = (temp, description, icon) => {
    clearDiv(weatherDiv);
    // clearDiv(document.querySelector("form"));

    let weatherCard = document.createElement("div");
    let weatherCardDate = document.createElement("h1");
    let weatherCardTemp = document.createElement("p");
    let weatherCardDescription = document.createElement("p");
    let weatherIcon = document.createElement("img");

    weatherCard.classList.add("weather-card");
    weatherCardDate.classList.add("date");
    weatherCardTemp.classList.add("weather-body");
    weatherCardDescription.classList.add("weather-body");
    weatherIcon.classList.add("icon");

    weatherIcon.setAttribute("src", weatherImageUrl + icon + "@2x.png");

    weatherDiv.appendChild(weatherCard);
    weatherCard.appendChild(weatherCardDate);
    weatherCard.appendChild(weatherCardTemp);
    // weatherCard.appendChild(weatherCardDescription);
    weatherCard.appendChild(weatherIcon);

    weatherCardDate.textContent = "Today";
    weatherCardTemp.textContent = temp;
    weatherCardDescription.textContent = description;
  };
  return { drawWeatherCard };
})();

async function apiQuery(city) {
  response = await fetch(urlBegin + city + urlMiddle + weatherApiKey, {
    mode: "cors",
  });

  return await response.json();
}

async function locApiQuery(city) {
  response = await fetch(
    geoCodeUrlBegin + city + geoCodeUrlMiddle + weatherApiKey,
    { mode: "cors" }
  );
  return await response.json();
}

// Module to control the form
const formController = (() => {
  const drawForm = () => {
    const form = document.createElement("form");
    const cityLabel = document.createElement("label");
    const cityField = document.createElement("input");
    const submitButton = document.createElement("button");

    form.setAttribute("onsubmit", "return false");

    cityLabel.textContent = "City:  ";
    submitButton.textContent = "Submit";

    formDiv.appendChild(form);
    form.appendChild(cityLabel);
    form.appendChild(cityField);
    form.appendChild(submitButton);

    submitButton.addEventListener("click", () => {
      city = cityField.value;
      getMain(city);
    });
  };
  return { drawForm };
})();

// Gets weather info from Open Weather API and calls functions to draw information to the screen
async function getMain(city) {
  // Get weather info
  let data = await apiQuery(city);
  let icon = await data.weather[0].icon;
  let tempK = await data.main.temp;
  let tempC = Math.round((tempK - 273.15) * 10) / 10;
  let tempF = Math.round((tempC * (9 / 5) + 32) * 10) / 10;
  let mainWeather = await data.weather[0].main; // Not currently used...maybe use in the future to populate further info
  let description = await data.weather[0].description;

  // Get city and state
  let locData = await locApiQuery(city);
  city = locData[0].name;
  let state = locData[0].state;
  let country = locData[0].country;

  console.log(city);
  console.log(state);
  console.log(country);

  clearDiv(formDiv);
  weatherCardController.drawWeatherCard(tempF, description, icon);
  formController.drawForm();
}

formController.drawForm();
getMain("birmingham");
