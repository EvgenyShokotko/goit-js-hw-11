import ImageApiService from './API-image-service';

const form = document.querySelector('.search-form');
console.log(form);
const btnLoadMore = document.querySelector('.load-more');
form.addEventListener('submit', onSearchFormClick);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
const imageApiService = new ImageApiService();
console.log(imageApiService);

function onSearchFormClick(event) {
  event.preventDefault();
  imageApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  imageApiService.resetPage();
  imageApiService.fetchImages().then(hits => console.log('HITS =', hits));
}

function onBtnLoadMoreClick() {
  imageApiService.fetchImages().then(hits => console.log('HITS =', hits));
}
