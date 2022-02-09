import {bootJSON} from './jsonLoader.js'
// OTHER PROMISE COMBINATOR METHODS:
// Promise.race(); - the first settled promise wins the race!
(async function () {
    const restOlympics = await Promise.race([
      bootJSON(`https://restcountries.com/v3.1/name/barbados`),
      bootJSON(`https://restcountries.com/v3.1/name/canada`),
      bootJSON(`https://restcountries.com/v3.1/name/Ghana`),
      bootJSON(`https://restcountries.com/v3.1/name/egypt`),
      bootJSON(`https://restcountries.com/v3.1/name/japan`),
      bootJSON(`https://restcountries.com/v3.1/name/12345`),
    ]);
  
    console.log(restOlympics[0].flag, restOlympics[0].name.official);
  })();
  
  /*
  A very useful real world application for promise.race is to guard against users 
  with a slow internet connection. You can use the setTimeout method with race to
  short-circuit and ajax call if the response is taking too long. Since a promise
  does not stop running until it's settled, this can prevent never ending promises 
  by forcefully settling the promise after a set time. 
  */
  
  // Create timeOut rejection promise:
  const restCountryLimit = function (ms) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`⟳ Request to server timed-out. Please try again! ⟳`));
      }, ms);
    });
  };
  
  Promise.race([
    bootJSON(`https://restcountries.com/v3.1/name/japan`),
    restCountryLimit(420),
  ])
    .then(highRest => console.log(highRest[0].flag))
    .catch(error => console.error(error.message));
  
  // Promise.allSettled() - returns an array from an array of all settled promises!
  Promise.allSettled([
    Promise.reject(3),
    Promise.resolve(4),
    Promise.reject(1),
    Promise.resolve(2),
    Promise.reject(5),
    Promise.resolve(6),
  ])
    .then(evenStevens => console.log(evenStevens))
    .catch(error => console.log(error.message));
  
  // Promise.any() - return the first promise that fulfills!
  Promise.any([
    Promise.reject(3),
    Promise.resolve(4),
    Promise.reject(1),
    Promise.resolve(2),
    Promise.reject(5),
    Promise.resolve(6),
  ])
    .then(evenStevens => console.log(evenStevens))
    .catch(error => console.log(error.message));