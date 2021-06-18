const galleryItems = [
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original: "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original: "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original: "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const imgRef = modalRef.querySelector(".lightbox__image");
const btnCloseRef = modalRef.querySelector(".lightbox__button");
const overlayRef = modalRef.querySelector(".lightbox__overlay");

const makeGallery = galleryItems.map(({ original, preview, description }, index) => {
  return `<li class="gallery__item"><a class="gallery__link" href=${original}><img data-index=${index} alt='${description}' data-source=${original} src=${preview}></a></li>`;
});

galleryRef.insertAdjacentHTML("beforeend", makeGallery.join(""));

galleryRef.addEventListener("click", onPictureClick);
btnCloseRef.addEventListener("click", closeModalPic);
overlayRef.addEventListener("click", closeModalPic);
window.addEventListener("keyup", slider);

let activeImg = 0;
const imgLength = galleryItems.length - 1;

function onPictureClick(event) {
  event.preventDefault();

  if (event.target.tagName !== "IMG") {
    return;
  }
  activeImg = +event.target.dataset.index;

  const srcOrigin = event.target.parentElement.getAttribute("href");
  const altOrigin = event.target.getAttribute("alt");

  updateAttrubuteModal(srcOrigin, altOrigin);

  modalRef.classList.add("is-open");

  window.addEventListener("keydown", onEscPress);
}

function onEscPress(event) {
  if (event.code !== "Escape") {
    return;
  }
  closeModalPic();
}

function closeModalPic() {
  modalRef.classList.remove("is-open");
  window.removeEventListener("keydown", onEscPress);
  updateAttrubuteModal();
}

function updateAttrubuteModal(src = "", alt = "") {
  imgRef.src = src;
  imgRef.alt = alt;
}

function slider(event) {
  if (event.code === "ArrowLeft") {
    activeImg -= 1;
    if (activeImg < 0) {
      activeImg = imgLength;
    }
  } else if (event.code === "ArrowRight") {
    activeImg += 1;
    if (activeImg > imgLength) {
      activeImg = 0;
    }
  }
  const { original, description } = galleryItems[activeImg];
  updateAttrubuteModal(original, description);
}
