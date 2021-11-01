//Подключить импорт в index.js
import debounce from 'debounce';

//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

const searchForm = document.getElementById('search-input');
searchForm.addEventListener('change', /* debounce( */ fetchImages /* , 1000) */);

export default async function fetchImages(search, pageValue = 1) {
  const BASE_URL = 'https://pixabay.com/api/?';
  let nextPoint = 'image_type=photo&orientation=horizontal';
  let searchPoint = `&q=${search}`;
  let pagePoint = `&page=${pageValue}`;
  let per_pagePoint = '&per_page=12';
  let API_KEY = '&key=24108487-0821a8cfb30bd7537d5ee3667';
  let url = BASE_URL + nextPoint + searchPoint + pagePoint + per_pagePoint + API_KEY;

  try {
    const response = await fetch(url);
    console.log(response);
    if (response.status === 404) {
      alert('Ошибка 404');
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return console.log(error);
  }
}
