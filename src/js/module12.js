//Подключить импорт в index.js

import debounce from 'debounce';

import { error, notice, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

//error ({text:"nnnnnnnnnn",})

/* let module12 = 'module-12';
//   https://goit.global/javascript/ru/v1/module-12/rest-api.html
const BASE_URL = `https://goit.global/`;
let endPoint = `javascript`;
let params = `/ru/v1/${module}/rest-api.html`; */

// https://restcountries.com/v2/name/peru
const base_url = `https://restcountries.com/`;
let endPointV = `v2/`;
let endPointName = `name/`;

const inputSearch = document.getElementById('inputCountry');
const countryResult = document.getElementById('countryList');

inputSearch.addEventListener('input', debounce(calback, 500));

function calback(e) {
  console.log(e.target.value);
  let inputCountry = e.target.value;
  console.log(inputCountry);

  let params = `${inputCountry}`;
  let url = base_url + endPointV + endPointName + params;
  fetch(url)
    .then(result => {
      console.log(result);
      return (result = result.json());
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(array => {
      let markup;
      if (inputCountry === ' ') {
        error({ text: 'Вы ничего не ввели' });
      } else if (!isNaN(inputCountry)) {
        notice({ text: 'Вы ввели числовое значение' });
      } else if (array.length > 10) {
        notice({ text: 'Введите более точный запрос' });
      } else if (array.length >= 2 && array.length <= 10) {
        markup = array
          .map(i => {
            console.log(i.name);
            return `<li>
        <p>${i.name}</p>
        </li> `;
          })
          .join('');
        countryResult.insertAdjacentHTML('afterbegin', markup);
      } else if (array.length === 1) {
        markup = array.map(i => {
          console.log(i.name);
          return `<li>
        <img width="300px" src="${i.flag}" alt="${i.name}">
        </li> `;
        });
        countryResult.insertAdjacentHTML('afterbegin', markup);
      }
    })
    .catch(error => {});
}
