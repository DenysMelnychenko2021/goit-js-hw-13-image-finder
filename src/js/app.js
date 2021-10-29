import debounce from 'debounce';

import refs from '../references/refs';
const { inputSearch } = refs;

import fetchCountries from './fetchCountries';

inputSearch.addEventListener('input', debounce(fetchCountries, 500));
