import { bootJSON } from './jsonLoader.js';

// Create function that renders country cards on screen:
const renderCountry = function (countryData, className = ``) {
  // display cards in on page with data from API:
  const html = `
     <article class="country ${className}">
     <img class="country__img" src="${countryData.flags.svg}" />
         <div class="country__data">
         <h3 class="country__name">${countryData.name.official}</h3>
         <h4 class="country__region">${countryData.region}</h4>
         <p class="country__row"><span>👫</span>${(
           +countryData.population / 1000000
         ).toFixed(2)}M</p>
         <p class="country__row"><span>🗣</span>${
           Object.values(countryData.languages)[0]
         }</p>
         <p class="country__row"><span>💰</span>${
           Object.values(countryData.currencies)[0].name
         }</p>
     </div>
     </article>`;

  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  countriesContainer.style.opacity = 1;
};

// Create function to display errors to users:
const errorMsg = msg => {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////////////
// Promisify the fetch API AJAX calls and consume them:

const getCountryData = function (country) {
  // get country data from rest countries API:
  bootJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    `The country of "${country}" can't be found!`
  )
    .then(data => {
      console.log(data);
      // use the API data to render country card:
      renderCountry(data[0]);
      // store border country:
      const neighbour = data[0].borders;
      console.log(neighbour);

      if (!neighbour)
        throw new Error(`The country of ${country} has no bordering nation!`);

      // get border country from API:
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

// btn.addEventListener(`click`, () => {
//   getCountryData(`Canada`);
// });

export { renderCountry, getCountryData };
