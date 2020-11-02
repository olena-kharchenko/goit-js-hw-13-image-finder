import ImageApiService from './apiService';
// import Handlebars from 'handlebars';
// import photoCard from '../templates/photoCard.hbs';

const formSearch = document.querySelector('#search-form');
const inputSearch = document.querySelector('.search-input');
const buttonSearch = document.querySelector('.search-btn');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiService();

function onSearch(event) {
  event.preventDefault();

  imageApiService.query = event.currentTarget.elements.query.value;
  imageApiService.resetPage();
  imageApiService.fetchImages();

  // console.log(imageApiService.fetchImages());
}

function onLoadMore() {
  imageApiService.fetchImages();
}
