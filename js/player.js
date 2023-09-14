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
const playList = [
  {
    title: "Aqua Caelestis",
    src: "../assets/sounds/AquaCaelestis.mp3",
    duration: "00:39",
  },
  {
    title: "Ennio Morricone",
    src: "../assets/sounds/Ennio Morricone.mp3",
    duration: "01:37",
  },
  {
    title: "River Flows In You",
    src: "../assets/sounds/River Flows In You.mp3",
    duration: "01:37",
  },
  {
    title: "Summer wind",
    src: "../assets/sounds/Summer wind.mp3",
    duration: "01:50",
  },
];

play.addEventListener("click", playAudio);
playNext.addEventListener("click", playAudioNext);
playPrev.addEventListener("click", playAudioPrev);
progress.addEventListener("input", progressChage);
volProgress.addEventListener("change", progressChage1);
volProgress.addEventListener("mousemove", progressChage1);
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
  console.log(lis);
  console.log(audio);
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
  console.log(audio);
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
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${
    audio.currentTime / (audio.duration / 100)
  }%, #C4C4C4 ${audio.currentTime / (audio.duration / 100)}%, #C4C4C4 100%)`;
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
}

export function progressChage() {
  audio.currentTime = progress.value * (audio.duration / 100);
}

export function progressChage1() {
  audio.volume = volProgress.value;
  volProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volProgress.value}%, #C4C4C4 ${volProgress.value}%, #C4C4C4 100%)`;
  if (volProgress.value > 0) {
    volume.style.backgroundImage = "url(assets/svg/volume.svg)";
  } else {
    volume.style.backgroundImage = "url(assets/svg/mute.svg)";
  }
}

export function smallPlay(e) {
  console.log(e.target);
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
