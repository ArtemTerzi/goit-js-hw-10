import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => {
    let country = e.target.value.trim();

    createMarkup(country);
  }, DEBOUNCE_DELAY)
);

function createMarkup(country) {
  return fetchCountries(country)
    .then(data => {
      if (data.length === 1) {
        return data.reduce(
          (acc, country) => acc + createFullMarkup(country),
          ''
        );
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return null;
      }

      if (data.length > 1 && data.length <= 10) {
        return data.reduce(
          (acc, country) => acc + createShortMarkup(country),
          ''
        );
      }
    })
    .then(markup => (refs.countryList.innerHTML = markup))
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryList.innerHTML = '';
    });
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}

function createShortMarkup({ flags, name }) {
  return `<li class="country-list__item--short"><img src="${flags.svg}" class="country-list__flag" width="25"/>
  <p>${name.official}</p>
    </li>`;
}

function createFullMarkup({ name, capital, population, flags, languages }) {
  return `<li class="country-list__item"><div class="country-list__country" ><img src="${
    flags.svg
  }" class="country-list__flag" width="50" />
  <p  class="country-list__name">${name.official}</p></div>
  <p><span class="country-list__text">Capital: </span>${capital}</p>
  <p><span class="country-list__text">Population: </span>${population}</p>
  <p><span class="country-list__text">Languages: </span>${Object.values(
    languages
  )}</p>
    </li>`;
}
