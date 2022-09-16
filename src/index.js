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
  if (imageApiService.searchQuery === '') {
    return alert('Input somthing');
  }

  imageApiService.resetPage();
  imageApiService.fetchImages().then(loadedImg => {
    clearConteiner();
    renderCardsHtml(loadedImg);
  });
}

function onBtnLoadMoreClick() {
  imageApiService.fetchImages().then(loadedImg => {
    renderCardsHtml(loadedImg);
  });
}
function renderCardsHtml(loadedImg) {
  gallery.insertAdjacentHTML('beforeend', TEMPLATE(loadedImg));
}
function clearConteiner() {
  gallery.innerHTML = '';
}
