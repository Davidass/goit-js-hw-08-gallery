import gallery from './gallery-items.js'; // eslint-disable-line
// console.log(gallery);

const refs = {
  ulGallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  backdropRef: document.querySelector('.lightbox__content'),
  largeImage: document.querySelector('.lightbox__image'),
  closeModalBnt: document.querySelector('button[data-action="close-lightbox"]'),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону. делаю по методу с 3 задания понимаю что нужно использовать другой метот но пока не разобрался

const createGalleryRef = images => {
  const arrItems = images.map(image => {
    const listItemRef = document.createElement('li');
    listItemRef.classList.add('gallery__item');

    const linkGalleryRef = document.createElement('a');
    linkGalleryRef.classList.add('gallery__link');
    linkGalleryRef.setAttribute('href', image.original);
    listItemRef.append(linkGalleryRef);

    const imageGalleryRef = document.createElement('img');
    imageGalleryRef.classList.add('gallery__image');
    imageGalleryRef.setAttribute('src', image.preview);
    imageGalleryRef.setAttribute('data-source', image.original);
    imageGalleryRef.setAttribute('alt', image.description);
    linkGalleryRef.append(imageGalleryRef);
    return listItemRef;
  });

  refs.ulGallery.append(...arrItems);
};

createGalleryRef(gallery);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.ulGallery.addEventListener('click', openGallery);
refs.closeModalBnt.addEventListener('click', onCloseModal);
refs.backdropRef.addEventListener('click', onBackDropClick);

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

  setLargeImageSrc(largeImageURL);
}
//Подмена значения атрибута src элемента img.lightbox__image.

function setLargeImageSrc(url) {
  refs.largeImage.src = url;
}

// Closing modal window

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '';
  refs.largeImage.alt = '';
  window.removeEventListener('keydown', onPressEscape);
}

// закрытие по клику на Backdrop
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
