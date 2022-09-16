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
    return alert('Input somthing');
  }

  imageApiService.resetPage();
  imageApiService
    .fetchImages()
    .then(loadedAll => {
      if (loadedAll.total >= 1) {
        alert(
          `we found ${loadedAll.total}, but you can watch only ${loadedAll.totalHits}`
        );
      }
      return loadedAll.hits;
    })
    .then(loadedImg => {
      if (loadedImg.length === 0) {
        return alert('We didnt find anything');
      }
      clearConteiner();
      renderCardsHtml(loadedImg);
    });
}

function onBtnLoadMoreClick() {
  imageApiService
    .fetchImages()
    .then(loadedAll => loadedAll.hits)
    .then(loadedImg => {
      renderCardsHtml(loadedImg);
    });
}
function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
}
function clearConteiner() {
  gallery.innerHTML = '';
}
