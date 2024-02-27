const inputAmount = document.querySelector("#inputAmount");
const btnCounter = document.querySelector("#btnCounter");
const selector = document.querySelector("#selector");
const result = document.querySelector("#result");
const errorLabel = document.querySelector("#error-label");

const urlNbp =
  "https://api.nbp.pl/api/exchangerates/tables/A/today/?format=json";

const showError = () => {
  errorLabel.textContent = "błąd pobierania danych";
  document.querySelector("div").appendChild(errorLabel);
};

removeError = () => {
  const error = document.querySelector("#error-label");
  if (error) {
    error.remove();
  }
};

btnCounter.addEventListener("click", () => {
  removeError();
  const selectedCurrency = selector.value;

  fetch(urlNbp)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const rates = {};
      data[0].rates.forEach((singleRate) => {
        rates[singleRate.code] = singleRate.mid;
      });

      if (selectedCurrency in rates) {
        const exchangeRate = rates[selectedCurrency];
        const plnAmount = inputAmount.value;
        if (plnAmount > 0) {
          const resultExchange = plnAmount * exchangeRate;
          result.textContent = `${resultExchange.toFixed(2)} PLN`;
        } else {
          result.textContent = "Wprowadź wartość większą od zera.";
        }
      } else {
        result.textContent = "Wybrana waluta nie jest obsługiwana";
      }
    })
    .catch(() => showError());
});
