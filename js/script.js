const playList = [
  {      
    title: 'Aqua Caelestis',
    src: '../assets/sounds/AquaCaelestis.mp3',
    duration: '00:39'
  },  
  {      
      title: 'Ennio Morricone',
      src: '../assets/sounds/Ennio Morricone.mp3',
      duration: '01:37'
  },
  {      
    title: 'River Flows In You',
    src: '../assets/sounds/River Flows In You.mp3',
    duration: '01:37'
  },
  {      
      title: 'Summer wind',
      src: '../assets/sounds/Summer wind.mp3',
      duration: '01:50'
  }  
]


const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameUser = document.querySelector('.name');
const body = document.querySelector('body');
let bgNum = getRandonNum();
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector('.slide-prev');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let isPlay = false;
const audio = new Audio();
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
let playNum = 0;
const audioName = document.querySelector('.audio-name');
const durarionAudio = document.querySelector('.durarion');
const timer = document.querySelector('.timer');
const buttonSettings = document.querySelector('.button-settings');
const settings = document.querySelector('.settings');
const disNone = document.querySelector('.disNone');
const apiImg = document.querySelector('.apiImg');
const lang = document.querySelector('.lang');
const weather = document.querySelector('.weather');
const player = document.querySelector('.player');
const footer = document.querySelector('footer');
const settingsLabelLang = document.querySelector('.settings-label-lang');
const settingsLabelImg = document.querySelector('.settings-label-img')
const settingsLabelHide = document.querySelector('.settings-label-hide')
const settingsLabelTage = document.querySelector('.settings-label-tage')
const settingsLabelTageInput = document.querySelector('.settings-label-tage-input');



const progress = document.querySelector('.progress');
const volProgress = document.querySelector('.volume-progress');
const volume = document.querySelector('.volume');
let langType = "en-En";
let index = 0;


const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const ul = document.querySelector('ul');
const exchange = document.querySelector('.exchange');
const container = document.querySelector('.container');


let bgTime = getTimeOfDay()





function showTime() {

const now = new Date();
const currentTime = now.toLocaleTimeString();


const day2 = now.toLocaleDateString(langType, { month: 'long', day: 'numeric', weekday: 'long'});
time.innerHTML = currentTime;
time.style.textTransform = "upperCase";
date.innerHTML = day2;
    setTimeout(showTime, 1000);
  }
  showTime();


  function showGreeting() {

      const timeOfDay = getTimeOfDay();
      if (langType == "en-En") {
        greeting.innerHTML = `Good ${timeOfDay}`;
      }
      if (langType == "ru-Ru") {
        if (timeOfDay == 'night') {
          greeting.innerHTML = "Доброй ночи"
      }
      if (timeOfDay == 'morning') {
        greeting.innerHTML = "Доброе утро"
      }
      if (timeOfDay == 'afternoon') {
        greeting.innerHTML = "Добрый день"
      }
      if (timeOfDay == 'evening') {
        greeting.innerHTML = "Добрый вечер"
      }

      }
      

        
  }

  function getTimeOfDay() {
    const now1 = new Date();
    const hour = now1.getHours();
    if (0 <= hour && hour < 6) {
        return 'night'
    }
    if (6 <= hour && hour < 12) {
        return 'morning'
    }
    if (12 <= hour && hour < 18) {
        return 'afternoon'
    }
    if (18 <= hour && hour < 24) {
        return 'evening'
    }
}
  showGreeting();

  function setLocalStorage() {
    localStorage.setItem('name', nameUser.value);
    localStorage.setItem('town', city.value);
    localStorage.setItem('lang', lang.value);
    localStorage.setItem('api', apiImg.value);
    localStorage.setItem('tage', settingsLabelTageInput.value);
    localStorage.setItem('hide', disNone.value);
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      nameUser.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('town')) {
      city.value = localStorage.getItem('town');
      getWeather();
    }
    if(localStorage.getItem('lang')) {
      lang.value = localStorage.getItem('lang');
      langSetting();
    }
    if(localStorage.getItem('tage')) {
      settingsLabelTageInput.value = localStorage.getItem('tage');
      tageSetting();
    }
    if(localStorage.getItem('api')) {
      apiImg.value = localStorage.getItem('api');
      apiSetting();
    }
    if(localStorage.getItem('hide')) {
      disNone.value = localStorage.getItem('hide');
      disSetting();
    }
  }
  window.addEventListener('load', getLocalStorage)
  nameUser.focus()

  function getRandonNum() {
    let min = Math.ceil(1);
    let max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  function getRandonQuote() {
    let min = Math.ceil(0);
    let max = Math.floor(19);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  

function bgImg() {
  const bgNumTo = bgNum.toString().padStart(2, "0");
  if(apiImg.value == "GitHub") {
    

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${bgTime}/${bgNumTo}.jpg`; 
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
        body.style.backgroundRepeat = 'no-repeat'
        
      };
    }
    if(apiImg.value == "Unsplash API") {
      getLinkToImage()
    }
    if(apiImg.value == "Flickr API") {
      getLinkToImageF()
    }

}

bgImg();

function getSlideNext() {
  if(apiImg.value == "GitHub") {
  if (bgNum > 19) {
    bgNum = 1;
  }
  else bgNum = bgNum + 1;
    bgImg();
  }
  if(apiImg.value == "Unsplash API") {
    getLinkToImage()
  }
  if(apiImg.value == "Flickr API") {
    if (bgNum > 19) {
      bgNum = 1;
    }
    else bgNum = bgNum + 1;
    getLinkToImageF();
    }
    
  // }
   
}

function getSlidePrev() {
  if(apiImg.value == "GitHub") {
    if (bgNum < 2) {
        console.log(bgNum)
         bgNum = 20;
    }
    else bgNum--;
    bgImg();
  }
  if(apiImg.value == "Unsplash API") {
    getLinkToImage()
  }
  if(apiImg.value == "Flickr API") {
    if (bgNum < 2) {
      console.log(bgNum)
       bgNum = 20;
  }
  else bgNum--;
  getLinkToImageF()
  }

  

}



slideNext.addEventListener('click', getSlideNext);

slidePrev.addEventListener('click', getSlidePrev);

async function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${bgTime}&client_id=TU1rJodMVg3hPJJRNxrKsIewkaSoLC3fvIPBW2BbeL8`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image; 
    img.src = data.urls.regular; 
  img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
      body.style.backgroundSize = 'cover'
      body.style.backgroundRepeat = 'no-repeat'
 }
}

async function getLinkToImageF() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1e0f80598c592d9cfff8fe8b99f85c57&tags=${bgTime}&extras=url_l&format=json&nojsoncallback=1&per_page=21`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image;
  img.src = data.photos.photo[bgNum].url_l; 
  img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
      body.style.backgroundSize = 'cover'
      body.style.backgroundRepeat = 'no-repeat'
  
 }

}


function getQuotes() {
  const quotes = 'data.json';
    const ran = getRandonQuote();
    
  if (langType == "en-En") {
    let qNum = 0
    fetch(quotes)
    .then(res => res.json())
    .then(data => { 
      quote.innerHTML = data[qNum][ran].text;
      author.innerHTML = data[qNum][ran].author;
    });
  }
  if (langType == "ru-Ru") {
    let qNum = 1
    fetch(quotes)
    .then(res => res.json())
    .then(data => { 
      quote.innerHTML = data[qNum][ran].text;
      author.innerHTML = data[qNum][ran].author;
    });
  }
  }
    
    
  getQuotes();
  changeQuote.addEventListener('click', getQuotes);


  function playAudio() {
    lis.forEach(item => {
        item.classList.remove('pause');
    })
    
    let a = audio.currentTime;
    console.log(lis)
    lis.forEach(item => {
      if (item.innerText == playList[playNum].title) {
        item.classList.add('pause');
      }
    })

    if(!isPlay) {
      isPlay = true;
      audio.src = playList[playNum].src;
      audio.currentTime = a;
      audio.play();
      lis.forEach(item => {
        if (item.innerText == playList[playNum].title) {
          item.classList.add('pause');
        }
      })
      

    }
    else {
      isPlay = false;
      audio.pause();
      lis.forEach(item => {
        if (item.innerText == playList[playNum].title) {
          item.classList.remove('pause');
        }
      })
    }
    audioName.innerHTML = playList[playNum].title;
    play.classList.toggle('pause');

  }

  function playAudioNext() {
    
    audio.currentTime = 0;
    if(playNum == playList.length-1) {
      playNum = 0; 
    }
    else {
      playNum++;
    }

    isPlay = true;
    audio.src = audio.src = playList[playNum].src;
    audioName.innerHTML = playList[playNum].title;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');
    lis.forEach(item => {
        item.classList.remove('pause');
    })
    lis.forEach(item => {
      if (item.innerText == playList[playNum].title) {
        item.classList.add('pause');
      }
    })
  }

  function playAudioPrev() {
    
    audio.currentTime = 0;
    if(playNum < 1) {
      playNum = playList.length-1; 
    }
    else {
      playNum--;
    }
    isPlay = true;
    audio.src = playList[playNum].src;
    audioName.innerHTML = playList[playNum].title;
    audio.currentTime = 0;
    audio.play();
    play.classList.add('pause');
    lis.forEach(item => {
        item.classList.remove('pause');
    })
    lis.forEach(item => {
      if (item.innerText == playList[playNum].title) {
        item.classList.add('pause');
      }
    })
  }

  play.addEventListener('click', playAudio);
  playNext.addEventListener('click', playAudioNext);
  playPrev.addEventListener('click', playAudioPrev);



  playList.forEach(el => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.classList.add('play-item');
    span.innerHTML = el.title;
    li.append(span); 
    playListContainer.append(li)
  })

  const lis = document.querySelectorAll('li')

  function tof() {
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${audio.currentTime/(audio.duration/100)}%, #C4C4C4 ${audio.currentTime/(audio.duration/100)}%, #C4C4C4 100%)`
    progress.value = audio.currentTime/(audio.duration/100);
    let minutes = Math.floor(audio.currentTime / 60) || 0;
    let seconds = Math.floor(audio.currentTime - minutes * 60) || 0;
    timer.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    let minutes1 = Math.floor(audio.duration / 60) || 0;
    let seconds1 = Math.floor(audio.duration - minutes1 * 60) || 0;
    durarionAudio.innerHTML = minutes1 + ':' + (seconds1 < 10 ? '0' : '') + seconds1;
    if (audio.currentTime == audio.duration) {
      play.classList.remove('pause');
    lis.forEach(item => {
        item.classList.remove('pause');
        isPlay = false;
    })
    }
  }

  function volPower() {
    
    if (audio.volume > 0) {
      audio.volume = 0;
      volume.style.backgroundImage = 'url(assets/svg/mute.svg)';
      volProgress.value = 0;
    }
    else {
      audio.volume = 1;
      volume.style.backgroundImage = 'url(assets/svg/volume.svg)';
      volProgress.value = 1;
    }
  
  }

  function progressChage() {
    audio.currentTime = progress.value * (audio.duration/100);
  }
  
  function progressChage1() {
    
    audio.volume = volProgress.value;
    volProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volProgress.value}%, #C4C4C4 ${volProgress.value}%, #C4C4C4 100%)`;
    if (volProgress.value > 0) {
      volume.style.backgroundImage = 'url(assets/svg/volume.svg)';
    }
    else {
    volume.style.backgroundImage = 'url(assets/svg/mute.svg)';
  }
  
  }

progress.addEventListener("input", progressChage);
volProgress.addEventListener("change", progressChage1);
volProgress.addEventListener("mousemove", progressChage1);
volume.addEventListener('click', volPower);
audio.addEventListener("timeupdate", tof);
buttonSettings.addEventListener('click', addSettings);
ul.addEventListener('click', smallPlay);



function smallPlay(e){
  e.target.classList.toggle('pause');
  let ind = null;
  lis.forEach(item => {
    if(item != e.target) {
      item.classList.remove('pause');
    }

})
  if (e.target.classList.contains('pause')) {
    play.classList.add('pause');
    lis.forEach((item, index) => {
      if (item.classList.contains('pause')) {
        ind = index;
      }
    })
      playNum = ind;
      isPlay = true;
      audio.src = playList[ind].src;
      audioName.innerHTML = playList[ind].title; 
      audio.play();
    }
    else {
      play.classList.remove('pause');
      isPlay = false;
      audio.pause();
    }
}





function addSettings() {
  settings.classList.toggle('add');
  buttonSettings.classList.toggle('click');
}


lang.addEventListener('change', langSetting);
apiImg.addEventListener('click', apiSetting);
disNone.addEventListener('change', disSetting);
settingsLabelTageInput.addEventListener('change', tageSetting)

function langSetting() {
  if (lang.value == 'en') {
    langType = "en-En";

  }
  if (lang.value == 'ru') {
    langType = "ru-Ru";
  }
  showGreeting();
  getQuotes();
  getWeather();
  changeSettings();
  

}

function tageSetting() {
  if (settingsLabelTageInput.value) {
    bgTime = settingsLabelTageInput.value;
  }
  else{
    bgTime = getTimeOfDay()
}
bgImg()
  

}

function apiSetting() {
  if(apiImg.value == "GitHub") {
    settingsLabelTage.style.display = "none";
    settingsLabelTageInput.style.display = "none"
  }
  if(apiImg.value == "Unsplash API") {
    settingsLabelTage.style.display = "block";
    settingsLabelTageInput.style.display = "inline-block"
  }
  if(apiImg.value == "Flickr API") {
    settingsLabelTage.style.display = "block";
    settingsLabelTageInput.style.display = "inline-block"
  }
  bgImg();
}

function disSetting() {
  time.classList.remove('off');
  date.classList.remove('off');
  quote.classList.remove('off');
  author.classList.remove('off');
  changeQuote.classList.remove('off');
  weather.classList.remove('off');
  player.classList.remove('off');
  greeting.classList.remove('off');
  nameUser.classList.remove('off');
  greeting.classList.remove('off');
  exchange.classList.remove('off');
  container.classList.remove('off');
  if (disNone.value == 'time') {
    time.classList.add('off');

  }
  if (disNone.value == 'date') {
    date.classList.add('off');
    
  }
  if (disNone.value == 'quote') {
    quote.classList.add('off');
    author.classList.add('off');
    changeQuote.classList.add('off');
    
  }
  if (disNone.value == 'weather') {
    weather.classList.add('off');
    
  }
  if (disNone.value == 'player') {
    player.classList.add('off');
    
  }
  if (disNone.value == 'greeting') {
    greeting.classList.add('off');
    nameUser.classList.add('off');
    
  }
  if (disNone.value == 'exchange') {
    exchange.classList.add('off');
    
  }
  if (disNone.value == 'todo') {
    container.classList.add('off');  
  }
}
   


function changeSettings() {
  if (langType == 'en-En') {
    settingsLabelLang.innerHTML = "Language";
    settingsLabelImg.innerHTML = "Image";
    settingsLabelHide.innerHTML = "Hide";
    settingsLabelTage.innerHTML = "Tage";
    // buttonSettings.innerHTML = "Settings";
  }
  if (langType == 'ru-Ru') {
    settingsLabelLang.innerHTML = "Язык";
    settingsLabelImg.innerHTML = "Картинка";
    settingsLabelHide.innerHTML = "Спрятать";
    settingsLabelTage.innerHTML = "Тег";
    // buttonSettings.innerHTML = "Настройки";
  }
}


async function getWeather() {  
    let langW; 
  if (langType == 'en-En') {
    langW = 'en'; 
  }
  if (langType == 'ru-Ru') {
    langW = 'ru'; 
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langW}&appid=d0408d219dbe88683f61bc4831c71e4b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod =='404') {
    weatherError.textContent = 'Error, city is not found';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
    weatherIcon.classList.add('off');
  }
  if(data.cod =='200') {
    weatherIcon.classList.remove('off');
  weatherError.textContent = '';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (langType == 'en-En') {
    humidity.textContent = `Humidity ${data.main.humidity}%`;
    wind.textContent = `Wind speed ${data.wind.speed}m/\s`;
  }
  if (langType == 'ru-Ru') {
    humidity.textContent = `Влажность ${data.main.humidity}%`;
    wind.textContent = `Скорость ветра ${data.wind.speed}м/\с`;
  }


  }

}
city.addEventListener('change', getWeather); 


  // todo


 let addButton = document.getElementById('add');
 let inputTask = document.getElementById('new-task');
 let unfinishedTasks = document.getElementById('unfinished-tasks');
 let finishedTasks = document.getElementById('finished-tasks');
  
  
  function createNewElement(task, finished) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');
  
      if(finished){
          checkbox.className = "material-icons checkbox";
          checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
      }else {
          checkbox.className = "material-icons checkbox";
          checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
      }
  
  
      let label = document.createElement('label');
      label.innerText = task;
      let input = document.createElement('input');
      input.type = "text";
      let editButton = document.createElement('button');
      editButton.className = "material-icons edit";
      editButton.innerHTML = "<i class='material-icons'>edit</i>";
      let deleteButton = document.createElement('button');
      deleteButton.className = "material-icons delete";
      deleteButton.innerHTML = "<i class='material-icons'>delete</i>";
  
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(input);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
      listItem.classList.add('deal');
  
      return listItem;
  }
  
  function addTask() {
      if (inputTask.value) {
        let listItem = createNewElement(inputTask.value, false);
          unfinishedTasks.appendChild(listItem);
          bindTaskEvents(listItem, finishTask)
          inputTask.value = "";
      }
      save();
  }
  addButton.onclick = addTask;
  
  function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
      ul.removeChild(listItem);
      save();
  }
  
  function editTask() {
      console.log(2);
      let editButton = this;
      let listItem = this.parentNode;
      let label = listItem.querySelector('label');
      let input = listItem.querySelector('input[type=text]');
  
      let containsClass = listItem.classList.contains('editMode');
  
      if (containsClass) {
          label.innerText = input.value;
          editButton.className = "material-icons edit";
          editButton.innerHTML = "<i class='material-icons'>edit</i>";
          save();
      } else {
          input.value = label.innerText;
          editButton.className = "material-icons save";
          editButton.innerHTML = "<i class='material-icons'>save</i>";
  
      }
      listItem.classList.toggle('editMode');
  }
  
  function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
      checkbox.className = "material-icons checkbox";
      checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
      finishedTasks.appendChild(listItem);
      bindTaskEvents(listItem, unfinishTask);
      save();
  }
  
  function unfinishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.checkbox');
      checkbox.className = "material-icons checkbox";
      checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
  
      unfinishedTasks.appendChild(listItem);
      bindTaskEvents(listItem, finishTask)
      save();
  }
  
  function bindTaskEvents(listItem, checkboxEvent) {
    let checkbox = listItem.querySelector('button.checkbox');
    let editButton = listItem.querySelector('button.edit');
    let deleteButton = listItem.querySelector('button.delete');
  
      checkbox.onclick = checkboxEvent;
      editButton.onclick = editTask;
      deleteButton.onclick = deleteTask;
  
  }
  function save() {
  
    let unfinishedTasksArr = [];
      for ( let i = 0; i < unfinishedTasks.children.length; i++) {
          unfinishedTasksArr.push(unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText);
      }
  
      let finishedTasksArr = [];
      for ( let i = 0; i < finishedTasks.children.length; i++) {
          finishedTasksArr.push(finishedTasks.children[i].getElementsByTagName('label')[0].innerText);
      }
  
      localStorage.removeItem('todo');
      localStorage.setItem('todo', JSON.stringify({
          unfinishedTasks: unfinishedTasksArr,
          finishedTasks: finishedTasksArr
      }));
  
  }
  
  function load(){
      return JSON.parse(localStorage.getItem('todo'));
  }
  
  let data=load();
  
  for( let i=0; i<data.unfinishedTasks.length;i++){
    let listItem=createNewElement(data.unfinishedTasks[i], false);
      unfinishedTasks.appendChild(listItem);
      bindTaskEvents(listItem, finishTask);
  }
  
  for( let i=0; i<data.finishedTasks.length; i++){
    let listItem=createNewElement(data.finishedTasks[i], true);
      finishedTasks.appendChild(listItem);
      bindTaskEvents(listItem, unfinishTask);
  }


  function CBR_XML_Daily_Ru(rates) {

    function trend(current, previous) {
      if (current > previous) return ' ▲';
      if (current < previous) return ' ▼';
      return '';
    }

      
    let USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
    let USD = document.getElementById('USD');
    USD.innerHTML =  USD.innerHTML.replace('00,00', USDrate);
    USD.innerHTML += trend(rates.Valute.USD.Value, rates.Valute.USD.Previous);
  
    let EURrate = rates.Valute.EUR.Value.toFixed(2).replace('.', ',');
    let EUR = document.getElementById('EUR');
    EUR.innerHTML =  EUR.innerHTML.replace('00,00', EURrate);
    EUR.innerHTML += trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous);
  }