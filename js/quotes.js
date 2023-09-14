import { langType } from "./script.js";
import { quote, author } from "./script.js";

export function getQuotes() {
  const quotes = "data.json";
  const ran = getRandonQuote();
  if (langType == "en-En") {
    let qNum = 0;
    fetch(quotes)
      .then((res) => res.json())
      .then((data) => {
        quote.innerHTML = data[qNum][ran].text;
        author.innerHTML = data[qNum][ran].author;
      });
  }
  if (langType == "ru-Ru") {
    let qNum = 1;
    fetch(quotes)
      .then((res) => res.json())
      .then((data) => {
        quote.innerHTML = data[qNum][ran].text;
        author.innerHTML = data[qNum][ran].author;
      });
  }
}

function getRandonQuote() {
  let min = Math.ceil(0);
  let max = Math.floor(19);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
