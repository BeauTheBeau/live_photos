const duration = 30;
let curTime = Date.now();

const photoContainers = document.querySelectorAll('.photo-container');
window.scrollTo(0, 0);

photoContainers.forEach((container) => {
    const img = container.querySelector('img');
    img.dataset.name = img.src.split('/').pop();
    img.dataset.author = "Unknown";
    if (!img.src) container.remove();
});

if (photoContainers.length === 0) {
    const photos = document.querySelector('.photos');
    photos.innerHTML = '<p>There are no photos in this gallery.</p>';
}

// Every <duration> seconds, scroll to the next photo
let nextPhoto = setInterval(() => {
    const photos = document.querySelectorAll('.photo-container');
    const currentPhoto = document.querySelector('.photo-container.current');
    const currentPhotoIndex = Array.from(photos).indexOf(currentPhoto);
    const nextPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    const nextPhoto = photos[nextPhotoIndex];
    currentPhoto.classList.remove('current');
    nextPhoto.classList.add('current');

    curTime = Date.now();

    setTimeout(() => {
        const photos = document.querySelector('.viewer');
        const currentPhotoCopy = currentPhoto.cloneNode(true);
        photos.appendChild(currentPhotoCopy);
        nextPhoto.scrollIntoView({behavior: 'smooth'});

        setTimeout(() => {
            currentPhoto.remove();
            nextPhoto.scrollIntoView();
        }, 500);
    }, 500);
}, duration * 1000);

// Update progress bar

const progressBar = document.querySelector('.progress_bar');
const progress = document.querySelector('.progress');

setInterval(() => {
    const timeElapsed = Date.now() - curTime;
    const percent = timeElapsed / (duration * 1000);
    progress.style.width = `${percent * 100}%`;

    if (percent >= 1) curTime = Date.now();
    else if (percent <= 0) curTime = Date.now() - duration * 1000;

}, 100);