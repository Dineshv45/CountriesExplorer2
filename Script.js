
const countryContainer = document.querySelector('.countries-container');
const filterRegion = document.querySelector('.filter');
const searchInput = document.querySelector('.search-bar');
const themeChanger = document.querySelector('.theme-changer');
function renderCountries(data) {
  countryContainer.innerHTML = "";

  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    countryCard.innerHTML = ` 
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="card-content">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString()}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital ? country.capital[0] : "N/A"}</p>
      </div>`;

    countryContainer.append(countryCard);
  });
}


let allCountriesData ;
fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
});

  filterRegion.addEventListener('change', () => {
  fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}?fields=name,flags,population,region,capital`)
    .then(res => res.json())
    .then(data => renderCountries(data));
});



searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  renderCountries(filteredCountries);
});


themeChanger.addEventListener('click', (e)=>{
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    localStorage.setItem('theme', isDark ? 'dark':'light');
    themeChanger.innerHTML = isDark
    ? '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode'
    : '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
})


if(localStorage.getItem('theme')==='dark'){
  document.body.classList.add('dark');
  themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode';
}
else{
  themeChanger.innerHTML= '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
}


// fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
// .then((res) => res.json())
// .then(data => {
//     data.forEach((country)=>{
//       //  console.log(country);
        
//     const countryCard = document.createElement("a");
//     countryCard.classList.add("country-card");
//     countryCard.href = `/country.html?name=${country.name.common}`

// countryCard.innerHTML = ` 
//                 <img src=${country.flags.svg} alt=${country.name.common}>
//                 <div class="card-content">
//                     <h3 class="card-title">${country.name.common}</h3>
//                     <p><b>Population: </b>${country.population.toLocaleString()}</p>
//                     <p><b>Region: </b>${country.region}</p>
//                     <p><b>Capital: </b>${country.capital}</p>
                   
//                 </div>`;
//                  // <p><b>Capital: </b>${country.capital[0]}</p>

// countryContainer.append(countryCard);
//     })
// })


// // const cardImg = document.createElement('img')
// // cardImg.src = 'https://flagcdn.com/is.svg';

// // countryCard.append(cardImg)

// filterRegion.addEventListener('change', (e)=>{
// fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}?fields=name,flags,population,region,capital`)
// .then((res) => res.json())
// .then(data => {

//     countryContainer.innerHTML = ""
//     data.forEach((country)=>{
//       //  console.log(country);
        
//     const countryCard = document.createElement("a");
//     countryCard.classList.add("country-card");
//     countryCard.href = `/country.html?name=${country.name.common}`

// countryCard.innerHTML = ` 
//                 <img src=${country.flags.svg} alt=${country.name.common}>
//                 <div class="card-content">
//                     <h3 class="card-title">${country.name.common}</h3>
//                     <p><b>Population: </b>${country.population.toLocaleString()}</p>
//                     <p><b>Region: </b>${country.region}</p>
//                     <p><b>Capital: </b>${country.capital}</p>
                   
//                 </div>`;
//                  // <p><b>Capital: </b>${country.capital[0]}</p>

// countryContainer.append(countryCard);
//     })
// })
// })


