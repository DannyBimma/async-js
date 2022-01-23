'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Make an AJAX call using XML-HTTP-Request:
// const countryCard = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // log the data from the API call:
//   request.addEventListener(`load`, function () {
//     console.log(this.responseText);

//     // parse the JSON text:
//     const [requestData] = JSON.parse(this.responseText);
//     console.log(requestData);

//     // display cards in on page with data from API:
//     const html = `
//     <article class="country">
//         <img class="country__img" src="${requestData.flags.svg}" />
//         <div class="country__data">
//         <h3 class="country__name">${requestData.name.official}</h3>
//         <h4 class="country__region">${requestData.region}</h4>
//         <p class="country__row"><span>👫</span>${requestData.population}</p>
//         <p class="country__row"><span>🗣️</span>${requestData.languages.eng}</p>
//         <p class="country__row"><span>💰</span>${requestData.currencies.BBD.name}</p>
//     </div>
//     </article>`;

//     countriesContainer.insertAdjacentHTML(`beforeend`, html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// countryCard(`barbados`);

const renderCountry = function (requestData, className = ``) {
  // display cards in on page with data from API:
  const html = `
   <article class="country ${className}">
       <img class="country__img" src="${requestData.flags.svg}" />
       <div class="country__data">
       <h3 class="country__name">${requestData.name.official}</h3>
       <h4 class="country__region">${requestData.region}</h4>
       <p class="country__row"><span>👫</span>${requestData.population}</p>
       <p class="country__row"><span>⚽️</span>${requestData.fifa}</p>
       <p class="country__row"><span>🌍</span>${requestData.subregion}</p>
   </div>
   </article>`;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  countriesContainer.style.opacity = 1;
};

const nextCountryCard = function (country) {
  // AJAX call for main country
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // asynchronously wait for the requested data to load:
  request.addEventListener(`load`, function () {
    // log response to console:
    console.log(this.responseText);

    // parse the JSON text into a JS object:
    const [requestData] = JSON.parse(this.responseText);
    console.log(requestData);

    // display country card on screen:
    renderCountry(requestData);

    // get neighbor country:
    const [neighboringCountry] = requestData.borders;
    if (!neighboringCountry) return;

    // AJAX call for neighboring country (using country code instead of name this time):
    const requestTwo = new XMLHttpRequest();
    requestTwo.open(
      `GET`,
      `https://restcountries.com/v3.1/alpha/${neighboringCountry}`
    );
    requestTwo.send();

    // asynchronously wait for the requested data to load:
    requestTwo.addEventListener(`load`, function () {
      // log response:
      console.log(this.responseText);

      // parse the JSON text into a JS object:
      const [requestDataTwo] = JSON.parse(this.responseText);
      console.log(requestDataTwo);

      // display country card on screen:
      renderCountry(requestDataTwo, `neighbour`);
    });
  });
};

nextCountryCard(`canada`);
