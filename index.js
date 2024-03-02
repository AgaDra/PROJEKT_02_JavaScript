const inputAmount = document.querySelector("#inputAmount");
const selector = document.querySelector("#selector");
const result = document.querySelector("#result");
const form = document.querySelector("#currency-converter");

const urlNbp = "https://api.nbp.pl/api/exchangerates/tables/A";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = event.target.inputAmount.value;
  const selectedCurrency = selector.value;

  fetch(urlNbp)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nie udało się pobrać kursu waluty");
      }
      return response.json();
    })
    .then((data) => {
      const rates = {};
      data[0].rates.forEach((singleRate) => {
        rates[singleRate.code] = singleRate.mid;
      });
      const exchangeRate = rates[selectedCurrency];
      const resultExchange = amount * exchangeRate;
      result.textContent = `${resultExchange.toFixed(2)} PLN`;
    })
    .catch((error) => {
      console.error("Błąd pobierania danych z NBP API:", error);
    });
});
