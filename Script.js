const countryContainer = document.querySelector('.countries-container');
const filterRegion = document.querySelector('.filter');
const searchInput = document.querySelector('.search-bar');
const themeChanger = document.querySelector('.theme-changer');

function showSkeletonCards(count = 8) {
  countryContainer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement('div');
    skeletonCard.className = 'skeleton-card skeleton';
    countryContainer.appendChild(skeletonCard);
  }
}

function renderCountries(data) {
  countryContainer.innerHTML = '';

  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `./country.html?name=${country.name.common}``;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="card-content">
        <h3>${country.name.common}</h3>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>`;
    countryContainer.appendChild(countryCard);
  });
}

let allCountriesData = [];

function fetchAllCountries() {
  showSkeletonCards();
  fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
    .then(res => res.json())
    .then(data => {
      allCountriesData = data;
      renderCountries(data);
    });
}

fetchAllCountries();

filterRegion.addEventListener('change', () => {
  showSkeletonCards();
  fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}?fields=name,flags,population,region,capital`)
    .then(res => res.json())
    .then(data => renderCountries(data));
});

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = allCountriesData.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );
  renderCountries(filtered);
});

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeChanger.innerHTML = isDark
    ? '<i class="fa-regular fa-sun"></i> Light Mode'
    : '<i class="fa-regular fa-moon"></i> Dark Mode';
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i> Light Mode';
}
