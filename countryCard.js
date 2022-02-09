import { userLocation } from './geolocation.js';

// CONSUMING PROMISES WITH ASYNC/AWAIT & try...catch:
// Using the web APIs with async/await & try...catch:

const showCountry = async function () {
  try {
    // obtain user location:
    const location = await userLocation();
    console.log(location);
    // destructure the coords object to get latitude & longitude:
    const { latitude: lat, longitude: lng } = location.coords;
    // ajax call to geocode api:
    const geoResponse = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );

    if (!geoResponse.ok)
      throw new Error(`😱 Location retrieval error: Check VPN!!`);

    console.log(geoResponse);
    // convert data stream to json object:
    const geoData = await geoResponse.json();
    console.log(geoData);
    // ajax call to rest-countries api endpoint:
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${geoData.country}`
    );

    if (!response.ok)
      throw new Error(`😱 API endpoint error: Check restcountries API!!`);

    // convert data stream to json object:
    const data = await response.json();

    console.log(response);
    console.log(data);
    console.log(data[0]);
    renderCountry(data[0]);

    return `You are in the city of ${data[0].city}!`;
  } catch (error) {
    console.error(error);

    // rethrow error that was caught:
    throw error;
  }
};

export { showCountry };
