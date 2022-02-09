import { bootJSON } from "./jsonLoader.js";
// RUNNING PROMISES IN PARALLEL:

const triCountryGetter = async function (country1, country2, country3) {
  try {
    // make 3 calls to rest-countries api
    // const [c1Data] = await bootJSON(
    //   `https://restcountries.com/v3.1/name/${country1}`
    // );

    // const [c2Data] = await bootJSON(
    //   `https://restcountries.com/v3.1/name/${country2}`
    // );

    // const [c3Data] = await bootJSON(
    //   `https://restcountries.com/v3.1/name/${country3}`
    // );
    // console.log(c1Data.capital[0], c2Data.capital[0], c3Data.capital[0]);

    // make 3 calls to rest-countries api simultaneously:
    const countryData = await Promise.all([
      bootJSON(`https://restcountries.com/v3.1/name/${country1}`),
      bootJSON(`https://restcountries.com/v3.1/name/${country2}`),
      bootJSON(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(countryData);
    console.log(countryData.map(data => data[0].capital[0]));
  } catch (e) {
    console.log(e.message);
  }
};

export {triCountryGetter}
