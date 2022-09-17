import Notiflix from 'notiflix';

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
  });
}

function sameCodeInParams(loadedAll) {
  const loadedImg = loadedAll.hits;
  const totalPicture = loadedAll.totalHits;
  imageApiService.countRemainPages(totalPicture);

  renderCardsHtml(loadedImg);
}

function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
}
function clearConteiner() {
  gallery.innerHTML = '';
}
