import ImageApiService from './apiService';
// import Handlebars from 'handlebars';
import photoCard from '../templates/photoCard.hbs';
import animateScrollTo from 'animated-scroll-to';
import { onOpenModal } from './modal';

const formSearch = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
articlesContainer.addEventListener('click', onOpenModal);

const imageApiService = new ImageApiService();

function onSearch(event) {
  event.preventDefault();
  loadMoreBtn.classList.add('is-hidden');
  const inputSearchValue = event.currentTarget.elements.query.value;

  imageApiService.query = inputSearchValue;

  imageApiService.resetPage();
  clearArticlesContainer();
  imageApiService.fetchImages().then(articles => {
    console.log(articles);
    if (articles.length > 0) {
      appendArticlesMarkup(articles);
      loadMoreBtn.classList.remove('is-hidden');
    }
  });
}

function onLoadMore() {
  imageApiService
    .fetchImages()

    .then(appendArticlesMarkup)
    .then(scrollToElement);
}

function appendArticlesMarkup(articles) {
  articlesContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearArticlesContainer() {
  articlesContainer.innerHTML = '';
}

function scrollToElement() {
  const indexToScroll = 12 * (imageApiService.page - 1) - 11;

  const itemToScroll = articlesContainer.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };
  animateScrollTo(itemToScroll, options);
}
