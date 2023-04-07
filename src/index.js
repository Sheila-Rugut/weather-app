let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
// let city = prompt("Enter a city");
// if (weather[city] !== undefined) {
//   city = city.toLowerCase().trim();
//   let temperature = Math.round(weather[city].temp);
//   let farenheightTemperature = Math.round((temperature * 9) / 5 + 32);
//   let humidity = Math.round(weather[city].humidity);

//   alert(
//     `It is currently ${temperature}°C (${farenheightTemperature}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else if (city.length === 0) {
//   alert("Please enter a city");
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }
function getDate() {
  let date = new Date();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchCity);

function displayCity(city) {
  let apiKey = "b264d51220a11888b81121dbd035a53b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  displayCity(city);
}
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

let farenheightTemp = document.querySelector("#farenheight-temp");
farenheightTemp.addEventListener("click", convertToFarenHeight);

let celciusTemp = document.querySelector("#celcius-temp");
celciusTemp.addEventListener("click", convertToCelcius);

function convertToFarenHeight(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = 21;
}
displayCity("New York");
