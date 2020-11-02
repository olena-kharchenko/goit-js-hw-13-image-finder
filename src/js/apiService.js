export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages(searchQuery) {
    const API_KEY = '18452046-d075d28130c097165687e8e16';
    const BASE_URL = 'https://pixabay.com/api';

    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(r => r.json())
      .then(data => {
        this.page += 1;
      });
  }

  resetPage() {
    this.page = 1;
  }

  getQuery() {
    return this.searchQuery;
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
}
