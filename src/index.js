import './css/styles.css';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import createMarkup from './js/createMarkup';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(e => {
    let country = e.target.value.trim();

    createMarkup(country);
  }, DEBOUNCE_DELAY)
);
