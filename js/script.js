import { showTime } from "./time.js";
import { showGreeting } from "./greening.js";
import "./todo.js";
import { getWeather } from "./weather.js";
import { getQuotes } from "./quotes.js";
import { bgImg, tageSetting } from "./imageSlider.js";
import "./player.js";

const nameUser = document.querySelector(".name");
export const body = document.querySelector("body");
export let langType = "en-En";
const changeQuote = document.querySelector(".change-quote");
export const quote = document.querySelector(".quote");
export const author = document.querySelector(".author");
const buttonSettings = document.querySelector(".button-settings");
const settings = document.querySelector(".settings");
const disNone = document.querySelector(".disNone");
export const apiImg = document.querySelector(".apiImg");
const lang = document.querySelector(".lang");
const weather = document.querySelector(".weather");
const player = document.querySelector(".player");
const settingsLabelLang = document.querySelector(".settings-label-lang");
const settingsLabelImg = document.querySelector(".settings-label-img");
const settingsLabelHide = document.querySelector(".settings-label-hide");
const settingsLabelTage = document.querySelector(".settings-label-tage");
const settingsLabelTageInput = document.querySelector(
  ".settings-label-tage-input"
);
export const city = document.querySelector(".city");
const exchange = document.querySelector(".exchange");
const container = document.querySelector(".container");

showTime();
showGreeting();
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", () => {
  getLocalStorage()
  if (document.documentElement.clientWidth <= 834) {
    document.querySelector('.box').appendChild(document.querySelector('.time-container'))
  }
});
window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth <= 834) {
    document.querySelector('.box').appendChild(document.querySelector('.time-container'))
  }
  if (document.documentElement.clientWidth > 834) {
    document.querySelector('.header').appendChild(document.querySelector('.time-container'))
    document.querySelector('.box').style.order = '2'
  }
});
nameUser.focus();
bgImg();
getQuotes();

changeQuote.addEventListener("click", getQuotes);
buttonSettings.addEventListener("click", addSettings);
lang.addEventListener("change", langSetting);
apiImg.addEventListener("click", apiSetting);
disNone.addEventListener("change", disSetting);
settingsLabelTageInput.addEventListener("change", tageSetting);
city.addEventListener("change", getWeather);

function setLocalStorage() {
  localStorage.setItem("name", nameUser.value);
  localStorage.setItem("town", city.value);
  localStorage.setItem("lang", lang.value);
  localStorage.setItem("api", apiImg.value);
  localStorage.setItem("tage", settingsLabelTageInput.value);
  localStorage.setItem("hide", disNone.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameUser.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("town")) {
    city.value = localStorage.getItem("town");
    getWeather();
  }
  if (localStorage.getItem("lang")) {
    lang.value = localStorage.getItem("lang");
    langSetting();
  }
  if (localStorage.getItem("tage")) {
    settingsLabelTageInput.value = localStorage.getItem("tage");
    tageSetting();
  }
  if (localStorage.getItem("api")) {
    apiImg.value = localStorage.getItem("api");
    apiSetting();
  }
  if (localStorage.getItem("hide")) {
    disNone.value = localStorage.getItem("hide");
    disSetting();
  }
}

function addSettings() {
  settings.classList.toggle("add");
  buttonSettings.classList.toggle("click");
}

function langSetting() {
  if (lang.value == "en") {
    langType = "en-En";
  }
  if (lang.value == "ru") {
    langType = "ru-Ru";
  }
  showGreeting();
  getQuotes();
  getWeather();
  changeSettings();
}

function apiSetting() {
  if (apiImg.value == "GitHub") {
    settingsLabelTage.style.display = "none";
    settingsLabelTageInput.style.display = "none";
  }
  if (apiImg.value == "Unsplash API") {
    settingsLabelTage.style.display = "block";
    settingsLabelTageInput.style.display = "inline-block";
  }
  if (apiImg.value == "Flickr API") {
    settingsLabelTage.style.display = "block";
    settingsLabelTageInput.style.display = "inline-block";
  }
  bgImg();
}

function disSetting() {
  time.classList.remove("off");
  date.classList.remove("off");
  quote.classList.remove("off");
  author.classList.remove("off");
  changeQuote.classList.remove("off");
  weather.classList.remove("off");
  player.classList.remove("off");
  greeting.classList.remove("off");
  nameUser.classList.remove("off");
  greeting.classList.remove("off");
  exchange.classList.remove("off");
  container.classList.remove("off");
  if (disNone.value == "time") {
    time.classList.add("off");
  }
  if (disNone.value == "date") {
    date.classList.add("off");
  }
  if (disNone.value == "quote") {
    quote.classList.add("off");
    author.classList.add("off");
    changeQuote.classList.add("off");
  }
  if (disNone.value == "weather") {
    weather.classList.add("off");
  }
  if (disNone.value == "player") {
    player.classList.add("off");
  }
  if (disNone.value == "greeting") {
    greeting.classList.add("off");
    nameUser.classList.add("off");
  }
  if (disNone.value == "exchange") {
    exchange.classList.add("off");
  }
  if (disNone.value == "todo") {
    container.classList.add("off");
  }
}

function changeSettings() {
  if (langType == "en-En") {
    settingsLabelLang.innerHTML = "Language";
    settingsLabelImg.innerHTML = "Image";
    settingsLabelHide.innerHTML = "Hide";
    settingsLabelTage.innerHTML = "Tage";
  }
  if (langType == "ru-Ru") {
    settingsLabelLang.innerHTML = "Язык";
    settingsLabelImg.innerHTML = "Картинка";
    settingsLabelHide.innerHTML = "Спрятать";
    settingsLabelTage.innerHTML = "Тег";
  }
}
