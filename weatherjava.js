let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("#day-time");
time.innerHTML = `${day}, ${hour}:${minutes}`;

//feature2

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".searchBar");

  let apiKey = "e668c3f06486c84f0c47dc2a44f18a25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", citySearch);
//feature3
function toFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("cur-temperature");
  temperatureElement.innerHTML = 79;
}
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", toFarenheit);

function toCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("cur-temperature");
  temperatureElement.innerHTML = 26;
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", toCelsius);

document.querySelector(".enter").addEventListener("click", citySearch);
document
  .querySelector(".current-button")
  .addEventListener("click", getGeoPosition);

function showWeather(response) {
  let city = response.data.name;
  document.querySelector(".city").innerHTML = city;
  let country = response.data.sys.country;
  document.querySelector(".country").innerHTML = country;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#cur-temperature").innerHTML = temperature;
  let weatherCondition = response.data.weather[0].main;
  document.querySelector(".weather-condition").innerHTML = weatherCondition;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = wind;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = humidity;
  console.log(response.data.weather);
}

function retrievePosition(position) {
  let apiKey = "e668c3f06486c84f0c47dc2a44f18a25";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getGeoPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
