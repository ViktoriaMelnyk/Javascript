const imgs = document.querySelectorAll(".gallery img");
for (let index = 0; index < imgs.length; index++) {
  const img = imgs[index];
  img.addEventListener("click", showLightbox);
}

function showLightbox(ev) {
  // pobranie poprzedniego elementu
  const prevEl = ev.target.prevElementSibling;
  const nextEl = ev.target.nextElementSibling;
  console.log(ev);
  // pobierz elementy z html-a
  const lightbox = document.querySelector(".lightbox");
  const img = document.querySelector(".lightbox img");
  // pobierz url klikniętej grafiki
  const imgUrl = ev.target.src;
  // przypisz do grafiki w lightboxie
  img.src = imgUrl;
  // pokaż lightbox
  lightbox.classList.add("visible");
} 

lightbox.addEventListener("click", hideLightbox);

function hideLightbox() {
  lightbox.classList.remove("visible");
}

// arrowNext.addEventListener("click", nextPhoto);

// function nextPhoto(ev) {
//   const arrowNext = document.querySelector(".arrowNext");
//   const img = document.querySelector(".arrowNext img");
//   const imgUrl = ev.target.src;
//   img.src = imgUrl;
//   const next = ev.target.nextElementSibling;
// }
