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

/*
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
// Create function that returns a promise:
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create a new image & set source:
    const image = document.createElement(`img`);
    image.src = imgPath;
    // when loaded append to DOM & resolve:
    image.onload = function () {
      imgBox.append(image);
      resolve(image);
    };
    // on error reject:
    image.onerror = function () {
      reject(new Error(`😢 Image path corrupted!`));
    };
  });
};

// Part 2:
let visibleImg;

// 2.
createImage(`img/img-1.jpg`)
  // 3.
  .then(img => {
    console.log(`img-1 loaded`);
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
    console.log(`img-2 loaded`);
    visibleImg = img;
    return wait(2);
  })
  // 6.
  .then(() => {
    visibleImg.style.display = `none`;
  })
  .catch(error => console.error(error));
///////////////////////////////////////////////////////////
*/

// p.s - like previous attempt, the code above throws errors when using VPN!
