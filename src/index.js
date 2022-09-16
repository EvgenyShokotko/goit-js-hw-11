import Notiflix from 'notiflix';

import { TEMPLATE } from './template-strings';
import ImageApiService from './API-image-service';

const form = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const imageApiService = new ImageApiService();

form.addEventListener('submit', onSearchFormClick);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

function onSearchFormClick(event) {
  event.preventDefault();
  imageApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  if (imageApiService.searchQuery.trim() === '') {
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
    const loadedImg = loadedAll.hits;
    if (loadedImg.length === 0) {
      Notiflix.Notify.failure(
        'OPPS, we didnt find anything. Try to input something else..'
      );
    }
    clearConteiner();
    renderCardsHtml(loadedImg);
  });
}

function onBtnLoadMoreClick() {
  imageApiService.fetchImages().then(loadedAll => {
    const loadedImg = loadedAll.hits;
    renderCardsHtml(loadedImg);
  });
}
function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
}
function clearConteiner() {
  gallery.innerHTML = '';
}
