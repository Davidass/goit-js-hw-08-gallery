import gallery from './gallery-items.js'; // eslint-disable-line
// console.log(gallery);

const refs = {
  ulGallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  backdropRef: document.querySelector('.lightbox__content'),
  largeImage: document.querySelector('.lightbox__image'),
  closeModalBnt: document.querySelector('button[data-action="close-lightbox"]'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблон по примеру с вебинара

// const createGalleryRef = ({ original, preview, description }) => {
//   const listItemRef = document.createElement('li');
//   listItemRef.classList.add('gallery__item');

//   const linkGalleryRef = document.createElement('a');
//   linkGalleryRef.classList.add('gallery__link');
//   linkGalleryRef.setAttribute('href', original);
//   listItemRef.append(linkGalleryRef);

//   const imageGalleryRef = document.createElement('img');
//   imageGalleryRef.classList.add('gallery__image');
//   imageGalleryRef.setAttribute('src', preview);
//   imageGalleryRef.setAttribute('data-source', original);
//   imageGalleryRef.setAttribute('alt', description);
//   linkGalleryRef.append(imageGalleryRef);

//   return listItemRef;
// };

// const createGalleryEl = gallery.map(createGalleryRef);

// refs.ulGallery.append(...createGalleryEl);

// Создание и рендер разметки по парсу

const cardsGallery = createGalleryRef(gallery);

refs.ulGallery.insertAdjacentHTML('beforeend', cardsGallery);

refs.ulGallery.addEventListener('click', openGallery);

function createGalleryRef(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"> <a class = "gallery___link" href="${original}"> <img class = "gallery__image" src="${preview}" data-source="${original}" alt="${description}"/> </a> </li>
    `;
    })
    .join('');
}
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

function openGallery(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;

  const largeImageURL = imageRef.dataset.source;

  refs.largeImage.src = largeImageURL;
  refs.largeImage.alt = imageRef.getAttribute('alt');

  // console.log(largeImageURL);
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onNextImgGallery);

  setLargeImageSrc(largeImageURL);
}

//Подмена значения атрибута src элемента img.lightbox__image.

function setLargeImageSrc(url) {
  refs.largeImage.src = url;
}

// закрытие по клику на Backdrop

refs.backdropRef.addEventListener('click', onBackDropClick);

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

// закрытие по клику на ESC
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

// закрытие модального окна
refs.closeModalBnt.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '';
  refs.largeImage.alt = '';
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onNextImgGallery);
}

// Пролистование галереи фотографий

function onNextImgGallery(event) {
  const rightKey = 'ArrowRight';
  const leftKey = 'ArrowLeft';

  let findIndexImg = gallery.findIndex(
    img => img.original === refs.largeImage.src,
  );

  if (event.code === leftKey) {
    if (findIndexImg === 0) {
      return;
    }
    findIndexImg -= 1;
  }

  if (event.code === rightKey) {
    if (findIndexImg === gallery.length - 1) {
      return;
    }
    findIndexImg += 1;
  }
  refs.largeImage.src = gallery[findIndexImg].original;
  refs.largeImage.alt = gallery[findIndexImg].description;
}
