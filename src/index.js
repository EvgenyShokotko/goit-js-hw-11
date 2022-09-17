import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { TEMPLATE } from './template-strings';
import { form, btnLoadMore, gallery } from './const';
import ImageApiService from './API-image-service';

form.addEventListener('submit', onSearchFormClick);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
btnLoadMore.disabled = true;

const imageApiService = new ImageApiService();

function onSearchFormClick(event) {
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
    btnLoadMore.disabled = true;
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  renderCardsHtml(loadedImg);
}

function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
  onSliderMake();
}
function clearConteiner() {
  gallery.innerHTML = '';
}
function onSliderMake() {
  const lightbox = new SimpleLightbox('.gallery a', {
    close: true,
    showCounter: true,
    preloading: true,
    enableKeyboard: true,
    docClose: true,
    disableScroll: true,
  });
  lightbox.refresh();
}
