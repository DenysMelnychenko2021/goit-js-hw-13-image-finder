//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

export default class API {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/?';
    this.nextPoint = 'image_type=photo&orientation=horizontal';
    this.API_KEY = '24108487-0821a8cfb30bd7537d5ee3667';
    this._query = '';
    this._page = 0;
  }
  get query() {
    return this._query;
  }
  set query(value) {
    return (this._query = value);
  }

  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }

  async getFetch() {
    let params = `&q=${this._query}&page=${this._page}&per_page=12&key=${this.API_KEY}`;
    let url = this.BASE_URL + this.nextPoint + params;
    console.log(this._page, this._query);
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        alert('Ошибка 404');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return console.log(error);
    }
  }
}
