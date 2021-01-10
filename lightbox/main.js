const lightbox = document.getElementById('lightbox');
const images = document.querySelectorAll('img');
const arrowLeft = document.createElement('button');
const arrowRight = document.createElement('button');
const iconL = document.createElement('i');
const iconR = document.createElement('i');
let activeImg;
const img = document.createElement('img');
iconL.className ='fas fa-chevron-left';
iconR.className ='fas fa-chevron-right';
arrowLeft.className ='arrow left-arrow';
arrowRight.className ='arrow right-arrow';
arrowLeft.appendChild(iconL);
arrowRight.appendChild(iconR);


images.forEach(image =>{
    image.addEventListener('click', (e) => {
        lightbox.classList.add('visible');
        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        activeImg = image.getAttribute('img__id');
        lightbox.append(img,arrowLeft,arrowRight);
        console.log(e);
        console.log(activeImg);
    });
});

function nextI() {
    activeImg++;
    if (activeImg > 8) activeImg = 0;
    img.src = images[activeImg].src;
    
}
function prevI() {
    activeImg--;
    if (activeImg < 0 ) activeImg = 8;
    img.src = images[activeImg].src;
}


function hideLightbox(e) {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('visible');
    console.log(e);
}
arrowLeft.addEventListener('click', prevI);
arrowRight.addEventListener('click', nextI);
lightbox.addEventListener('click', hideLightbox);

