const weatherApiKey = "8b72d72bb036e3dd941b0c85d286e9d8";
const gifApiKey = "aY5njGGdGK9pPmx5nPARWp7npLyt8QQy";
const urlBegin = "http://api.openweathermap.org/data/2.5/weather?q=";
const urlMiddle = "&APPID=";
const weatherImageUrl = "http://openweathermap.org/img/wn/";

const date = new Date();

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

    let day = date.getDay();
    let dayNo = date.getDate();
    let month = date.getMonth();

    // Convert number day to string day
    switch (day) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
    }

    // Convert number month to string month
    switch (month) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }

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

    weatherCardDate.textContent = `${day}, ${month} ${dayNo}`;
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

async function locApiQuery(geoCodeUrl) {
  response = await fetch(geoCodeUrl, { mode: "cors" });
  return await response.json();
}

// Module to control the form
const formController = (() => {
  const drawForm = () => {
    const form = document.createElement("form");
    const cityLabel = document.createElement("label");
    const stateLabel = document.createElement("label");
    const cityField = document.createElement("input");
    const stateField = document.createElement("input");
    const submitButton = document.createElement("button");

    form.setAttribute("onsubmit", "return false");

    cityLabel.textContent = "City:  ";
    stateLabel.textContent = "State: ";
    submitButton.textContent = "Submit";

    formDiv.appendChild(form);
    form.appendChild(cityLabel);
    form.appendChild(cityField);
    form.appendChild(stateLabel);
    form.appendChild(stateField);
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

  // Get lat and lon
  let lat = await data.coord.lat;
  let lon = await data.coord.lon;

  // Get city and state
  // let locData = await locApiQuery(city);
  // city = locData[0].name;
  // let state = locData[0].state;
  // let country = locData[0].country;

  console.log(lat);
  console.log(lon);

  let geoCodeUrl =
    "http://api.openweathermap.org/geo/1.0/reverse?lat=" +
    lat +
    "&lon=" +
    lon +
    "&limit=1&appid=" +
    weatherApiKey;

  let locData = await locApiQuery(geoCodeUrl);

  city = locData[0].name;
  let state = locData[0].state;
  let country = locData[0].country;

  console.log(city, state, country);

  clearDiv(formDiv);
  weatherCardController.drawWeatherCard(tempF, description, icon);
  formController.drawForm();
}

formController.drawForm();
getMain("birmingham");
