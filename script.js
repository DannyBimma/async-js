'use strict';
// MODULE IMPORTS:
import { loadAndPause, loadAll } from './challenge3.js';
import { triCountryGetter } from './parallelPromises.js';
import { bootJSON } from './jsonLoader.js';
import { locateMe } from './locatorCoords.js';
import { userLocation } from './geolocation.js';
import { showCountry } from './countryCard.js';
import * as pcs from './promiseCombinators.js';

// NODES:
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
////////////////////////////////////////////////////////////////////

/*
// Make an AJAX call using XML-HTTP-Request:
const countryCard = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // log the data from the API call:
  request.addEventListener(`load`, function () {
    console.log(this.responseText);

    // parse the JSON text:
    const [requestData] = JSON.parse(this.responseText);
    console.log(requestData);

    // display cards in on page with data from API:
    const html = `
    <article class="country">
        <img class="country__img" src="${requestData.flags.svg}" />
        <div class="country__data">
        <h3 class="country__name">${requestData.name.official}</h3>
        <h4 class="country__region">${requestData.region}</h4>
        <p class="country__row"><span>👫</span>${requestData.population}</p>
        <p class="country__row"><span>🗣️</span>${requestData.languages.eng}</p>
        <p class="country__row"><span>💰</span>${requestData.currencies.BBD.name}</p>
    </div>
    </article>`;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);
    countriesContainer.style.opacity = 1;
  });
};

countryCard(`barbados`);
*/

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

/*
// Make and AJAX call using the fetch API:
const request = fetch(`https://restcountries.com/v3.1/name/barbados`);
console.log(request);
*/

// Consume the promise built by the fetch API:
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

/*
// Replicate above with arrow functions and callbacks:
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

/////////////////////////////////////////////////////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY 
based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1

1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude 
value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates 
to a meaningful location, like a city and country name. Use this API to do reverse geocoding: 
https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. 
Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
that is cheating 😉 !

3. Once you have the data, take a look at it in the console to see all the attributes that you 
received about the provided location. Then, using this data, log a message like this to the console: 
'You are in Berlin, Germany.'

4. Chain a .catch method to the end of the promise chain and log errors to the console.

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this 
error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise 
in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2

6. Now it's time to use the received data to render a country. So take the relevant attribute from the 
geocoding API result, and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture 
(you can even copy this code, no need to type the same code)!

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

/*
// 1.
const whereAmI = function (lat, lng) {
  // 2. & 3. 5.
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`❌ ${response.status}: Response was unresponsive`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.state}, ${data.country}.`);
      // 6. 7.
      getCountryData(`${data.country}`);
    })
    // 4.
    .catch(error => {
      console.error(`😢 Sorry: ${error.message}.`);
    });
};

// whereAmI(19.037, 72.873);
// whereAmI(52.508, 13.381);
// whereAmI(-33.933, 18.474);
*/

/*
// THE EVENT LOOP IN PRACTICE:
console.log(`THE EVENT LOOP IN PRACTICE:`);

console.log(`Event loop test commencement:`);
setTimeout(() => console.log(`0 sec timer!`), 0);
Promise.resolve(`Promise resolution #1`).then(response =>
  console.log(response)
);
console.log(`Event loop test termination`);

// Create a promise with a long micro-task:
// Promise.resolve(`Promise resolution #2`).then(response => {
//   for (let i = 0; i < 888888888; i++) {}
//   console.log(response);
// });

// Create a new Promise:
const lottoPromise = new Promise(function (resolve, reject) {
  console.log(`💸Lotto Draw Starts Now💸`);
  // create asynchronous functionality:
  setTimeout(function () {
    // define promise resolution & rejection:
    if (Math.random() >= 0.5) {
      resolve(`🎉 CONGRATS... YA WIN DE LOTTO!!`);
    } else {
      reject(new Error(`💩 OH SHIT... ya money burn!!`));
    }
  }, 5000);
});

// Consume the promise you just created:
lottoPromise
  .then(resolution => console.log(resolution))
  .catch(rejection => console.error(rejection));

// Create a setTimeout counter using promises:
const counter = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds + 1000);
  });
};

// Consume counter:
counter(1)
  .then(() => {
    console.log(`Count Number: #1`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #2`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #3`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #4`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #5`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #6`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #7`);
    return counter(2);
  })
  .then(() => {
    console.log(`Count Number: #8`);
  });

// Create promises that resolve & reject immediately:
Promise.resolve(`✊🏾 The resolution will be console logged!`).then(
  resolution => {
    console.log(resolution);
  }
);

Promise.reject(`🙅🏾‍♂️ No resolve, pure rejection!`).catch(rejection => {
  new Error(rejection);
});
*/

/////////////////////////////////////////////////////////////////////

// userLocation().then(location => console.log(location));

/////////////////////////////////////////////////////////////////////////////////
// RETURNING VALUES FROM ASYNC FUNCTIONS:
// console.log(`1: GET LOCATION`);
// showCountry()
//   .then(value => console.log(value))
//   .catch(error => console.error(`2: ${error.message}`))
//   .finally(() => console.log(`3: LOCATION GOT`));

// // RETURNING VALUES FROM ASYNC FUNCTIONS WITH ASYNC FUNCTION:
// (async function () {
//   try {
//     const city = await showCountry();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.log(`2: ${error.message}`);
//   }
//   console.log(`3: LOCATION GOT`);
// })();

// Coding Challenge #3:
// loadAndPause();
loadAll([`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`]);

// Running Promises in Parallel:
triCountryGetter(`Barbados`, `Ghana`, `Canada`);

// Show country card for user Location:
btn.addEventListener(`click`, locateMe);
// p.s - for some reason this does not work with VPN enabled!
