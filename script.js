'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const errorMsg = msg => {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (countryData, className = ``) {
  // display cards in on page with data from API:
  const html = `
   <article class="country ${className}">
   <img class="country__img" src="${countryData.flags.svg}" />
       <div class="country__data">
       <h3 class="country__name">${countryData.name.official}</h3>
       <h4 class="country__region">${countryData.region}</h4>
       <p class="country__row"><span>👫</span>${countryData.population}</p>
       <p class="country__row"><span>🗣</span>${
         Object.values(countryData.languages)[0]
       }</p>
       <p class="country__row"><span>💰</span>${
         Object.values(countryData.currencies)[0].name
       }</p>
   </div>
   </article>`;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  // countriesContainer.style.opacity = 1;
};

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

/*
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
*/

// Make and AJAX call using the fetch API:
// const request = fetch(`https://restcountries.com/v3.1/name/barbados`);
// console.log(request);

// Consume the promise built by the fetch API:
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      // call json on response to read data(doing so creates another promise so return it):
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
*/

// Create helper function (which will return a promise) to make AJAX call and convert to JSON:
const bootJSON = function (url, errorMsg = `Whoops, something's gone awry!!`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`❌ ${response.status}: ${errorMsg}`);

    return response.json();
  });
};

// Replicate above with arrow functions:
const getCountryData = function (country) {
  bootJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    `Country "${country}" can't be found!`
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      console.log(neighbour);

      if (!neighbour)
        throw new Error(`The country of ${country} has no bordering nation!`);

      // get border country:
      return bootJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        `Neighbouring country for "${country}" can't be found!`
      );
    })
    .then(data => renderCountry(data[0], `neighbour`))
    .catch(error => {
      console.error(error);
      errorMsg(`${error.message}. Please Try Again!! `);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener(`click`, () => {
  getCountryData(`Barbados`);
});

/*
// Replicate above with arrow functions:
const getCountryData = function (country) {
  // get main country
  fetch(`https://restcountries.com/v3.1/name/${country}`) // fetch returns a promise
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(
          `❌ ${response.status}: The country "${country}" does not exist!`
        );
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[110];

      // get neighbour country:
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `❌ ${response.status}: The country "${country}" does not exist!`
        );
      return response.json();
    })
    .then(data => renderCountry(data[0], `neighbour`))
    .catch(error => {
      console.error(error);
      errorMsg(`${error.message}. Please Try Again!! `);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener(`click`, () => {
  getCountryData(`spain`);
});
*/
