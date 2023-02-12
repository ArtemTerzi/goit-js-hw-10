import { refs } from './refs';
import { Notify } from 'notiflix';
import fetchCountries from './fetchCountries';
import createShortMarkup from './createShortMarkup';
import createFullMarkup from './createFullMarkup';

export default function createMarkup(country) {
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
