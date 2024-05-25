const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Unsplash API
const apiKey = "WghznZSC_U5NAwoGfLeGTuYEnEKRujtg5Dl54PvX6Hw";
const count = 30;
const query = "war"
const apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${query}`;
// Set attributes
function setAttributes(element, attributes){
     for (const key in attributes){
        element.setAttribute(key, attributes[key]);
     }
}
// Check if all images were loaded
function imageLoaded(){
    console.log("Image loaded successfully")
    imagesLoaded++;
    if (imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready = ", ready);
    }
}
// Create elements for links and photos, and add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        totalImages = photosArray.length;
        // Create anchor element to link to Unsplash
        const item = document.createElement('a');
        //  item.setAttribute('href', photo.links.html);
        //  item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create img for photo
        const img = document.createElement('img');
        //  img.setAttribute('src',photo.urls.regular);
        //  img.setAttribute('alt', photo.alt_description);
        //  img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener for when image is loaded
        img.addEventListener("load", imageLoaded);
        item.appendChild(img);
        imageContainer.append(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error){
        // Error Handling here
    }
}
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false;
        console.log("Event listener triggered")
        getPhotos();
    }
});

// On Load
getPhotos();