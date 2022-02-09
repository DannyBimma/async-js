////////////////////////////////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, 
this time using async/await (only the part where the promise is consumed). 
Compare the two versions, think about the big differences, and see which one 
you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' 
in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'.

2. Use .map to loop over the array, to load all the images with the 'createImage' 
function (call the resulting array 'imgs').

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉.

5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. 
To test, turn off the 'loadNPause' function.
GOOD LUCK 😀
*/

const imgBox = document.querySelector(`.images`);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Part 1:
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

let visibleImg;

const loadAndPause = async function () {
  // display then hide image 1:
  try {
    visibleImg = await createImage(`img/img-1.jpg`);
    await wait(2);
  } catch (error) {
    console.log(error);
  } finally {
    visibleImg.style.display = `none`;
  }
  // display then hide image 2:
  try {
    visibleImg = await createImage(`img/img-2.jpg`);
    await wait(2);
  } catch (error) {
    console.log(error);
  } finally {
    visibleImg.style.display = `none`;
  }
  // display then hide image 3:
  try {
    visibleImg = await createImage(`img/img-3.jpg`);
    await wait(2);
  } catch (error) {
    console.log(error);
  } finally {
    visibleImg.style.display = `none`;
  }
};

// loadAndPause();

// Part 2:
// 1:
const loadAll = async function (imgArray) {
  try {
    // 2.
    const imgs = imgArray.map(async image => await createImage(image));
    // 3. 4.
    const imgPaths = await Promise.all(imgs);
    console.log(imgPaths);
    // 5.
    imgPaths.forEach(image => image.classList.add(`parallel`));
  } catch (error) {
    console.error(error.message);
  }
};

// loadAll([`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`]);

export { imgBox, wait, createImage, visibleImg, loadAndPause, loadAll };
