function CBR_XML_Daily_Ru(rates) {
  function trend(current, previous) {
    if (current > previous) return " ▲";
    if (current < previous) return " ▼";
    return "";
  }
  let USDrate = rates.Valute.USD.Value.toFixed(2).replace(".", ",");
  let USD = document.getElementById("USD");
  USD.innerHTML = USD.innerHTML.replace("00,00", USDrate);
  USD.innerHTML += trend(rates.Valute.USD.Value, rates.Valute.USD.Previous);
  let EURrate = rates.Valute.EUR.Value.toFixed(2).replace(".", ",");
  let EUR = document.getElementById("EUR");
  EUR.innerHTML = EUR.innerHTML.replace("00,00", EURrate);
  EUR.innerHTML += trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous);
}
