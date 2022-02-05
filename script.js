'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

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
  // countriesContainer.style.opacity = 1;
};

// Create function to display errors to users:
const errorMsg = msg => {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////////////
// Promisify the fetch API AJAX calls and consume them:

// Create helper function (which will return a promise) to make AJAX call and convert to JSON:
const bootJSON = function (url, errorMsg = `Whoops, something's gone awry!!`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`❌ ${response.status}: ${errorMsg}`);

    return response.json();
  });
};

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
// PROMISIFYING THE GEO-LOCATION API:

// Create a new Promise object that returns user location upon
// successful resolution:
const userLocation = function () {
  return new Promise(function (resolve, reject) {
    // Obtain user location:
    // navigator.geolocation.getCurrentPosition(
    //   location => resolve(location),
    //   error => reject(error)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// p.s - the getCurrentPosition method automatically calls the resolve &
// reject functions & passes in the location from the geo-location API
// that the Promise's executor function is initiated with!

// userLocation().then(location => console.log(location));

// Build a function like 'whereAmI' which renders a country ONLY based on
// GPS coordinates:
const locateMe = function () {
  // get user location coordinates from promise:
  userLocation()
    .then(location => {
      console.log(location);
      console.log(location.coords);
      // destructure the coords object to get latitude & longitude:
      const { latitude: lat, longitude: lng } = location.coords;
      // return an AJAX call to the reverse geo-coding api endpoint:
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      // return json data from AJAX call:
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(`${data.country}`);
    })
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener(`click`, locateMe);
// p.s - for some reason this does not work with VPN enabled!

/////////////////////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some 
stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function 
returns a promise which creates a new image (use document.createElement('img')) and sets 
the .src attribute to the provided image path. When the image is done loading, append it to 
the DOM element with the 'images' class, and resolve the promise. The fulfilled value should 
be the image element itself. In case there is an error loading the image ('error' event), 
reject the promise.
If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler.

3. After the image has loaded, pause execution for 2 seconds using the wait function 
we created earlier.

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and 
load a second image (HINT: Use the image element returned by the createImage promise to 
hide the current image. You will need a global variable for that 😉).

5. After the second image has loaded, pause execution for 2 seconds again.

6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

// Solution:
// Content node needed for Part 1:
const imgBox = document.querySelector(`.images`);

// Wait function needed for Part 2:
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Part 1:
// 1.
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement(`img`);
    image.src = imgPath;

    image.addEventListener(`load`, function () {
      imgBox.append(image);
      resolve(image);
    });

    image.addEventListener(`error`, function () {
      reject(new Error(`😢 Image Not Found!`));
    });
  });
};

// Part 2:
let visibleImg;

// 2.
createImage(`img/img-1.jpg`)
  // 3.
  .then(img => {
    visibleImg = img;
    return wait(2);
  })
  // 4.
  .then(() => {
    visibleImg.style.display = `none`;
    return createImage(`img/img-2.jpg`);
  })
  // 5.
  .then(img => {
    visibleImg = img;
    return wait(2);
  })
  // 6.
  .then(() => {
    visibleImg.style.display = `none`;
  })
  .catch(error => console.error(error));
///////////////////////////////////////////////////////////
