import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { TEMPLATE, lastImg } from './template-strings';
import { form, btnLoadMore, gallery, sentinel } from './const';
import ImageApiService from './API-image-service';
import { onSliderMake } from './simple-light-box';

form.addEventListener('submit', onSearchFormClick);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
btnLoadMore.disabled = true;

const imageApiService = new ImageApiService();

function onSearchFormClick(event) {
  observer.observe(sentinel);
  event.preventDefault();
  btnLoadMore.disabled = false;
  imageApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  console.log(event.currentTarget.elements.searchQuery.value);
  if (imageApiService.searchQuery.trim() === '') {
    btnLoadMore.disabled = true;
    return Notiflix.Notify.info(
      'The field can not be empty.Input something to start'
    );
  }
  imageApiService.resetPage();
  imageApiService.fetchImages().then(loadedAll => {
    if (loadedAll.total >= 1) {
      Notiflix.Notify.success(
        `We found ${loadedAll.total} images, but you can watch free only ${loadedAll.totalHits}`
      );
    }
    if (loadedAll.hits.length === 0) {
      Notiflix.Notify.failure(
        `OPPS, we didnt find anything about "${imageApiService.searchQuery}". Try to input something else..`
      );
    }
    clearConteiner();
    sameCodeInParams(loadedAll);
  });
}

function onBtnLoadMoreClick() {
  imageApiService.fetchImages().then(loadedAll => {
    sameCodeInParams(loadedAll);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  });
}

function sameCodeInParams(loadedAll) {
  const loadedImg = loadedAll.hits;
  if (loadedImg.length < 40 && loadedImg.length > 0) {
    observer.unobserve(sentinel);
    btnLoadMore.disabled = true;
    sentinel.innerHTML = lastImg;
  }
  renderCardsHtml(loadedImg);
}

function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
  onSliderMake();
}

function clearConteiner() {
  gallery.innerHTML = '';
  sentinel.innerHTML = '';
}

// Infinity Scroll
const observer = new IntersectionObserver(callbackInfinity, {
  rootMargin: '250px',
});

function callbackInfinity(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageApiService.searchQuery.trim() !== '') {
      imageApiService.fetchImages().then(loadedAll => {
        sameCodeInParams(loadedAll);
      });
    }
  });
}

observer.observe(sentinel);
