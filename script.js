const weatherApiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const gifApiKey = "aY5njGGdGK9pPmx5nPARWp7npLyt8QQy";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";

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
  const drawWeatherCard = (temp, description) => {
    clearDiv(weatherDiv);
    // clearDiv(document.querySelector("form"));

    let weatherCard = document.createElement("div");
    let weatherCardDate = document.createElement("h1");
    let weatherCardTemp = document.createElement("p");
    let weatherCardDescription = document.createElement("p");

    weatherCard.classList.add("weather-card");
    weatherCardDate.classList.add("date");
    weatherCardTemp.classList.add("weather-body");
    weatherCardDescription.classList.add("weather-body");

    weatherDiv.appendChild(weatherCard);
    weatherCard.appendChild(weatherCardDate);
    weatherCard.appendChild(weatherCardTemp);
    weatherCard.appendChild(weatherCardDescription);

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
async function getMain(city) {
  let data = await apiQuery(city);
  let tempK = await data.main.temp;
  let tempC = Math.round((tempK - 273.15) * 10) / 10;
  let tempF = Math.round((tempC * (9 / 5) + 32) * 10) / 10;
  let mainWeather = await data.weather[0].main;
  let description = await data.weather[0].description;

  clearDiv(formDiv);
  weatherCardController.drawWeatherCard(tempF, description);
  formController.drawForm();
}

formController.drawForm();
getMain("birmingham");
