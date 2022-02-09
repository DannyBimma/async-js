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

export { userLocation };
