import { userLocation } from './geolocation.js';
import { getCountryData } from './countryRender.js';

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

export { locateMe };
