import { langType } from "./script.js";
import { city } from "./script.js";

const weatherIcon = document.querySelector(".weather-icon");
const weatherError = document.querySelector(".weather-error");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

export async function getWeather() {
  let langW;
  if (langType == "en-En") {
    langW = "en";
  }
  if (langType == "ru-Ru") {
    langW = "ru";
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langW}&appid=d0408d219dbe88683f61bc4831c71e4b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == "404") {
    weatherError.textContent = "Error, city is not found";
    temperature.textContent = "";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
    weatherIcon.classList.add("off");
  }
  if (data.cod == "200") {
    weatherIcon.classList.remove("off");
    weatherError.textContent = "";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (langType == "en-En") {
      humidity.textContent = `Humidity ${data.main.humidity}%`;
      wind.textContent = `Wind speed ${data.wind.speed}m/\s`;
    }
    if (langType == "ru-Ru") {
      humidity.textContent = `Влажность ${data.main.humidity}%`;
      wind.textContent = `Скорость ветра ${data.wind.speed}м/\с`;
    }
  }
}
