import { apiImg, body } from "./script.js";
import { getTimeOfDay } from "./greening.js";

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

let bgNum = getRandonNum();

function getRandonNum() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let bgTime = getTimeOfDay();

export function tageSetting() {
  if (settingsLabelTageInput.value) {
    bgTime = settingsLabelTageInput.value;
  } else {
    bgTime = getTimeOfDay();
  }
  bgImg();
}

export function bgImg() {
  const bgNumTo = bgNum.toString().padStart(2, "0");
  if (apiImg.value == "GitHub") {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${bgTime}/${bgNumTo}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
      body.style.backgroundRepeat = "no-repeat";
    };
  }
  if (apiImg.value == "Unsplash API") {
    getLinkToImage();
  }
  if (apiImg.value == "Flickr API") {
    getLinkToImageF();
  }
}

function getSlideNext() {
  if (apiImg.value == "GitHub") {
    if (bgNum > 19) {
      bgNum = 1;
    } else bgNum = bgNum + 1;
    bgImg();
  }
  if (apiImg.value == "Unsplash API") {
    getLinkToImage();
  }
  if (apiImg.value == "Flickr API") {
    if (bgNum > 19) {
      bgNum = 1;
    } else bgNum = bgNum + 1;
    getLinkToImageF();
  }
}

function getSlidePrev() {
  if (apiImg.value == "GitHub") {
    if (bgNum < 2) {
      bgNum = 20;
    } else bgNum--;
    bgImg();
  }
  if (apiImg.value == "Unsplash API") {
    getLinkToImage();
  }
  if (apiImg.value == "Flickr API") {
    if (bgNum < 2) {
      bgNum = 20;
    } else bgNum--;
    getLinkToImageF();
  }
}

async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${bgTime}&client_id=TU1rJodMVg3hPJJRNxrKsIewkaSoLC3fvIPBW2BbeL8`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
  };
}

async function getLinkToImageF() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e0f80598c592d9cfff8fe8b99f85c57&tags=${bgTime}&extras=url_l&format=json&nojsoncallback=1&per_page=21`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.photos.photo[bgNum].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
  };
}
