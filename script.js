const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyToLoadMoreImages = false;
let imagesLoaded = 0;
let incomingImages = 0;
let photosArray = [];
let isInitialLoad = true;

const initialCount = 5;
const apiKey = "_n9_8GRMeo68U1hT6PQqx2pA9ShV9ja-LmrBH6v-1Wo";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
console.log("apiUrl: ", apiUrl);

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  console.log("apiUrl: ", apiUrl);
}

function areAllImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === incomingImages) {
    readyToLoadMoreImages = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  incomingImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", areAllImagesLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    console.log("isInitialLoad: ", isInitialLoad);
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
      console.log("isInitialLoad: ", isInitialLoad);
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadMoreImages
  ) {
    readyToLoadMoreImages = false;
    getPhotos();
  }
});

getPhotos();
