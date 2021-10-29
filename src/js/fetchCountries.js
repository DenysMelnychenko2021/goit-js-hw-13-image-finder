import { error, notice, defaultModules } from '@pnotify/core/dist/PNotify.js';
//import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
//defaultModules.set(PNotifyMobile, {});

import renderCountry from '../templates/template.handlebars';

import refs from '../references/refs';
const { countryResult } = refs;

export default function fetchCountries(searchQuery) {
  let inputCountry = searchQuery.target.value;
  console.log(searchQuery);

  const base_url = `https://restcountries.com/`;
  let endPointV = `v2/`;
  let endPointName = `name/`;
  let params = `${inputCountry}`;
  let url = base_url + endPointV + endPointName + params;

  fetch(url)
    .then(result => {
      return (result = result.json());
    })
    .then(response => {
      if (response.status === 404) {
        error({
          text: 'Ошибка 404. Сервер не может найти данные согласно запросу',
          delay: 500,
        });
      }
      return response;
    })
    .then(array => {
      console.log(array);
      if (inputCountry === ' ') {
        notice({
          text: 'Вы ничего не ввели',
          delay: 500,
        });
      } else if (!isNaN(inputCountry)) {
        notice({
          text: 'Вы ввели числовое значение',
          delay: 500,
        });
      } else if (array.length > 10) {
        onClearCountry();
        notice({ text: 'Введите более точный запрос', delay: 500 });
      } else if (array.length >= 2 && array.length <= 10) {
        onClearCountry();
        let markupList = array
          .map(i => {
            return `<li><p>${i.name}</p></li> `;
          })
          .join('');
        countryResult.insertAdjacentHTML('afterbegin', markupList);
      } else if (array.length === 1) {
        onClearCountry();
        countryResult.insertAdjacentHTML('afterbegin', renderCountry(array));
      }
    })
    .catch(error => console.log(error));
}

function onClearCountry() {
  countryResult.innerHTML = '';
}
