const countryName = new URLSearchParams(location.search).get('name');
const countryImg = document.querySelector('.country-details img');
const cname = document.querySelector('.country-info h1');
const nativeName = document.querySelector('.native-name');
const countryPopulation = document.querySelector('.country-population');
const countryRegion = document.querySelector('.country-region');
const countrySubRegion = document.querySelector('.country-subregion');
const countryCapital = document.querySelector('.country-capital');
const countryDomain = document.querySelector('.country-domain');
const countryCurrency = document.querySelector('.country-currency');
const countryLang = document.querySelector('.country-lang');
const countryBorders = document.querySelector('.border-countries');
const backBtn = document.querySelector('.back-btn');
const themeChanger = document.querySelector('.theme-changer');

// Add shimmer classes before data is fetched
function showSkeleton() {
  countryImg.classList.add('skeleton');
  cname.classList.add('skeleton-text');
  document.querySelectorAll('.info p span').forEach(span => {
    span.classList.add('skeleton-text');
  });
}

function removeSkeleton() {
  countryImg.classList.remove('skeleton');
  cname.classList.remove('skeleton-text');
  document.querySelectorAll('.info p span').forEach(span => {
    span.classList.remove('skeleton-text');
  });
}

showSkeleton();

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    countryImg.src = country.flags.svg;
    cname.innerText = country.name.common;

    nativeName.innerText = country.name.nativeName
      ? Object.values(country.name.nativeName)[0].common
      : country.name.common;

    countryPopulation.innerText = country.population.toLocaleString();
    countryRegion.innerText = country.region;
    countrySubRegion.innerText = country.subregion || "N/A";
    countryCapital.innerText = country.capital || "N/A";
    countryDomain.innerText = country.tld ? country.tld.join(', ') : "N/A";

    if (country.currencies) {
      const currencies = Object.values(country.currencies);
      countryCurrency.innerText = currencies.map(c => `${c.name} (${c.symbol})`).join(", ");
    }

    if (country.languages) {
      countryLang.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement('a');
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `./country.html?name=${borderCountry.name.common}`;
            countryBorders.append(borderCountryTag);
          });
      });
    }

    removeSkeleton();
  });

backBtn.addEventListener('click', () => history.back());

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode';
} else {
  themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
}

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeChanger.innerHTML = isDark
    ? '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode'
    : '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
});
