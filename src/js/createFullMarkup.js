export default function createFullMarkup({
  name,
  capital,
  population,
  flags,
  languages,
}) {
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
