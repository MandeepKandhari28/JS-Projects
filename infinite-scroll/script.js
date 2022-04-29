const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArrays = [];
let isPhotoFetchingComplete = false;

// Unsplash API
const count = 30;
const ACCESS_KEY = 'syAo1-NlmTsnD0BZNnQ89wTGyoj3pIFVSyhlpQQLOxQ';
const unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=${count}`;

const imagesLoadingComplete = () => {
    console.log('image loaded complete');
    isPhotoFetchingComplete = true;
    loader.hidden = true;
}

// Set attributes for elements
const setElementAttributes = (element, attributesArray) => {
    for(const key in attributesArray) {
        element.setAttribute(key, attributesArray[key])
    }
}


// Create Elements for Links and Photos, Add to DOM
const displayPhotos = () => {
    for(const photo of photosArrays) {
        // create <a> to link to Unsplash
        const anchor = document.createElement('a');

        setElementAttributes(anchor, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');

        setElementAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Put <img> inside <a>, then put both inside image-container element
        anchor.appendChild(img);
        imageContainer.appendChild(anchor);
    }

    console.log('fetching complete');

    imagesLoadingComplete();
}


// Get Photos from unsplash API
const fetchPhotos = async () => {
    try{
        const response = await fetch(unsplashAPI);

        photosArrays = await response.json();

        displayPhotos();
    } catch(error) {
        console.log('error', error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isPhotoFetchingComplete) {
        console.log('load more photos');
        isPhotoFetchingComplete = false;
        fetchPhotos();
    };
});


// onLoad
fetchPhotos();