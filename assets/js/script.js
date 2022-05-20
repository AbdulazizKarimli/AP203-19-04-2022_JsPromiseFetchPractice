const searchInp = document.querySelector("input[type='text']");
const selectBox = document.querySelector(".form-select");
const form = document.querySelector("form");
const cityName = document.querySelector(".cityName");
const countryName = document.querySelector(".countryName");
const weatherForecast = document.querySelector(".weatherForecast");
const skyConditionImg = document.querySelector(".skyCondition-img");
const skyConditionText = document.querySelector(".skyCondition-text");
const errorBox = document.querySelector(".error-box");
const resultBox = document.querySelector(".result-box");

async function getDataAsync(url) {
  let promise = await fetch(url);
  let response = await promise.json();

  let responseObj = {
    statusCode: promise.status,
    response,
  };

  return responseObj;
}

form.addEventListener("submit", search);

async function search(e) {
  e.preventDefault();

  let result = await getDataAsync(
    `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${searchInp.value}`
  );
  if (result.statusCode === 200) {
    errorBox.classList.add("d-none");
    resultBox.classList.remove("d-none");
    cityName.innerText = result.response.location.name;
    countryName.innerText = result.response.location.country;
    weatherForecast.innerText = result.response.current[selectBox.value];
    skyConditionImg.innerHTML = `<img src="https:${result.response.current.condition.icon}" />`;
    skyConditionText.innerText = result.response.current.condition.text;
  } else {
    errorBox.classList.remove("d-none");
    resultBox.classList.add("d-none");
  }
}
