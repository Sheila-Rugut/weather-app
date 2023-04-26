let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function getDate() {
  let date = new Date();
  let day = date.getDay();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours = hours;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }

  let time = hours + ":" + minutes;
  return `${days[day]} ${time}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = getDate();

//Display weather information for current city
let currentLocation = document.querySelector("#current-location-btn");
currentLocation.addEventListener("click", displayCurrentLocation);

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let apiKey = "b264d51220a11888b81121dbd035a53b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//Display weather info for searched city
let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchCity);
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  displayCity(city);
}
function displayCity(city) {
  let apiKey = "b264d51220a11888b81121dbd035a53b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = celsiusTemperature;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  displayForecast();
}

//convert celcius to fahrenheit
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = celsiusTemperature;
}
function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="forecast-temperature">
          <span class="forecast-temperature-max"> 25° </span>
          <span class="forecast-temperature-min"> 21° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
displayCity("New York");
