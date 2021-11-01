import refs from '../references/refs';
import templateImages from '../templates/template.handlebars';
import API from './apiService';

const { searchForm, marcupList, scrollUp } = refs;

const fetchImages = new API();

searchForm.addEventListener('submit', createImages);

function createImages(e) {
  e.preventDefault();
  fetchImages.page = 1;
  fetchImages.query = e.target.elements.query.value;
  fetchImages
    .getFetch()
    .then(data => data.hits)
    .then(hits => {
      marcupList.insertAdjacentHTML('beforeend', templateImages(hits));
      getScroll(hits);
    });

  searchForm.reset();
}

function getScroll(array) {
  if (fetchImages.page !== 1) {
    const firstImg = document.querySelector(`[src="${array[0].webformatURL}"]`);
    firstImg.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  }
}
