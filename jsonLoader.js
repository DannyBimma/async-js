// Create helper function (which will return a promise) to make AJAX call and convert to JSON:
const bootJSON = function (url, errorMsg = `Whoops, something's gone awry!!`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`❌ ${response.status}: ${errorMsg}`);

    return response.json();
  });
};

export { bootJSON };
