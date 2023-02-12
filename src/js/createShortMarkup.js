export default function createShortMarkup({ flags, name }) {
  return `<li class="country-list__item--short"><img src="${flags.svg}" class="country-list__flag" width="25"/>
  <p>${name.official}</p>
    </li>`;
}
