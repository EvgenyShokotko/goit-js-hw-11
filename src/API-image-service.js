export default class ImageApiService {
  constructor() {
    this.queryInput = '';
    this.page = 1;
  }

  fetchImages() {
    const axios = require('axios').default;
    const BASE = 'https://pixabay.com/api/';
    const KEY = '29966398-6999e84d15bca17b916749cbf';
    const OPTIONS = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const url = `${BASE}?key=${KEY}&q=${this.queryInput}&${OPTIONS}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        this.incrementPage();

        return data.hits;
      });
    // axios
    //   .get(`${BASE}?key=${KEY}&q=${queryInput}&${OPTIONS}`)
    //   .then(function (response) {
    //     // handle success
    //     //   if (condition) {
    //     //   }
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get searchQuery() {
    return this.queryInput;
  }
  set searchQuery(newSearchQuery) {
    this.queryInput = newSearchQuery;
  }
}
