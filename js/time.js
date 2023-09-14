import { langType } from "./script.js";
const time = document.querySelector(".time");
const date = document.querySelector(".date");

export function showTime() {
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  const day2 = now.toLocaleDateString(langType, {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  time.innerHTML = currentTime;
  time.style.textTransform = "upperCase";
  date.innerHTML = day2;
  setTimeout(showTime, 1000);
}
