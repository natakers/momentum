import { langType } from "./script.js";
const greeting = document.querySelector(".greeting");

export function showGreeting() {
  const timeOfDay = getTimeOfDay();
  if (langType == "en-En") {
    greeting.innerHTML = `Good ${timeOfDay}`;
  }
  if (langType == "ru-Ru") {
    if (timeOfDay == "night") {
      greeting.innerHTML = "Доброй ночи";
    }
    if (timeOfDay == "morning") {
      greeting.innerHTML = "Доброе утро";
    }
    if (timeOfDay == "afternoon") {
      greeting.innerHTML = "Добрый день";
    }
    if (timeOfDay == "evening") {
      greeting.innerHTML = "Добрый вечер";
    }
  }
}

export function getTimeOfDay() {
  const now1 = new Date();
  const hour = now1.getHours();
  if (0 <= hour && hour < 6) {
    return "night";
  }
  if (6 <= hour && hour < 12) {
    return "morning";
  }
  if (12 <= hour && hour < 18) {
    return "afternoon";
  }
  if (18 <= hour && hour < 24) {
    return "evening";
  }
}
