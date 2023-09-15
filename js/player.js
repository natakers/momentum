import { playList } from "../playList.js";

const play = document.querySelector(".play");
const playNext = document.querySelector(".play-next");
const playPrev = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const progress = document.querySelector(".progress");
const volProgress = document.querySelector(".volume-progress");
const volume = document.querySelector(".volume");
const audio = new Audio();
const ul = document.querySelector("ul");
const lis = document.querySelectorAll("li");
let isPlay = false;
let playNum = 0;
const audioName = document.querySelector(".audio-name");
const durarionAudio = document.querySelector(".durarion");
const timer = document.querySelector(".timer");

play.addEventListener("click", playAudio);
playNext.addEventListener("click", playAudioNext);
playPrev.addEventListener("click", playAudioPrev);
progress.addEventListener("input", progressChage);
volProgress.addEventListener("input", progressChage1);
volume.addEventListener("click", volPower);
audio.addEventListener("timeupdate", tof);
ul.addEventListener("click", smallPlay);

playList.forEach((el) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.classList.add("play-item");
  span.innerHTML = el.title;
  li.append(span);
  playListContainer.append(li);
});

export function playAudio() {
  lis.forEach((item) => {
    item.classList.remove("pause");
  });
  let a = audio.currentTime;
  lis.forEach((item) => {
    if (item.innerText == playList[playNum].title) {
      item.classList.add("pause");
    }
  });
  if (!isPlay) {
    isPlay = true;
    audio.src = playList[playNum].src;
    audio.currentTime = a;
    audio.play();
    lis.forEach((item) => {
      if (item.innerText == playList[playNum].title) {
        item.classList.add("pause");
      }
    });
  } else {
    isPlay = false;
    audio.pause();
    lis.forEach((item) => {
      if (item.innerText == playList[playNum].title) {
        item.classList.remove("pause");
      }
    });
  }
  audioName.innerHTML = playList[playNum].title;
  play.classList.toggle("pause");
}

export function playAudioNext() {
  audio.currentTime = 0;
  if (playNum == playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }
  isPlay = true;
  audio.src = audio.src = playList[playNum].src;
  audioName.innerHTML = playList[playNum].title;
  audio.currentTime = 0;
  audio.play();
  play.classList.add("pause");
  lis.forEach((item) => {
    item.classList.remove("pause");
  });
  lis.forEach((item) => {
    if (item.innerText == playList[playNum].title) {
      item.classList.add("pause");
    }
  });
}

export function playAudioPrev() {
  audio.currentTime = 0;
  if (playNum < 1) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  isPlay = true;
  let s = document.querySelector("ausio");
  audio.src = playList[playNum].src;
  audioName.innerHTML = playList[playNum].title;
  audio.currentTime = 0;
  audio.play();
  play.classList.add("pause");
  lis.forEach((item) => {
    item.classList.remove("pause");
  });
  lis.forEach((item) => {
    if (item.innerText == playList[playNum].title) {
      item.classList.add("pause");
    }
  });
}

export function tof() {
  progress.style.background = `linear-gradient(to right, #AFCACF 0%, #AFCACF ${
    audio.currentTime / (audio.duration / 100)
  }%, #fff ${audio.currentTime / (audio.duration / 100)}%, #ffff 100%)`;
  progress.value = audio.currentTime / (audio.duration / 100);
  let minutes = Math.floor(audio.currentTime / 60) || 0;
  let seconds = Math.floor(audio.currentTime - minutes * 60) || 0;
  timer.innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  let minutes1 = Math.floor(audio.duration / 60) || 0;
  let seconds1 = Math.floor(audio.duration - minutes1 * 60) || 0;
  durarionAudio.innerHTML =
    minutes1 + ":" + (seconds1 < 10 ? "0" : "") + seconds1;
  if (audio.currentTime == audio.duration) {
    play.classList.remove("pause");
    lis.forEach((item) => {
      item.classList.remove("pause");
      isPlay = false;
    });
  }
}

export function volPower() {
  if (audio.volume > 0) {
    audio.volume = 0;
    volume.style.backgroundImage = "url(assets/svg/mute.svg)";
    volProgress.value = 0;
  } else {
    audio.volume = 1;
    volume.style.backgroundImage = "url(assets/svg/volume.svg)";
    volProgress.value = 1;
  }
  volProgress.style.background = `linear-gradient(to right, #AFCACF 0%, #AFCACF ${volProgress.value*100}%, #ffff ${volProgress.value*100}%, #ffff 100%)`;
}

export function progressChage() {
  audio.currentTime = progress.value * (audio.duration / 100);
}

export function progressChage1() {
  audio.volume = volProgress.value;
  volProgress.style.background = `linear-gradient(to right, #AFCACF 0%, #AFCACF ${volProgress.value*100}%, #ffff ${volProgress.value*100}%, #ffff 100%)`;
  if (volProgress.value > 0) {
    volume.style.backgroundImage = "url(assets/svg/volume.svg)";
  } else {
    volume.style.backgroundImage = "url(assets/svg/mute.svg)";
  }
}

export function smallPlay(e) {
  e.target.classList.toggle("pause");
  let ind = null;
  lis.forEach((item) => {
    if (item != e.target) {
      item.classList.remove("pause");
    }
  });
  if (e.target.classList.contains("pause")) {
    play.classList.add("pause");
    lis.forEach((item, index) => {
      if (item.classList.contains("pause")) {
        ind = index;
      }
    });
    playNum = ind;
    isPlay = true;
    audio.src = playList[ind].src;
    audioName.innerHTML = playList[ind].title;
    audio.play();
  } else {
    play.classList.remove("pause");
    isPlay = false;
    audio.pause();
  }
}
