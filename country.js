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

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    
    countryImg.src = country.flags.svg
    //cname.innerText = country.altSpellings[1]
    cname.innerText = country.name.common

    if(country.name.nativeName)
    {
        //console.log(Object.values(country.name.nativeName)[0].common);
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeName.innerText = country.name.common;
    }

    countryPopulation.innerText = country.population;

    countryRegion.innerText = country.region;

    if(country.subregion){
        countrySubRegion.innerText = country.subregion;
    }

    if( country.capital){
        countryCapital.innerText = country.capital;
    }

    if(country.tld){
        countryDomain.innerText = country.tld.join(', ');
    }

   //countryCurrency.innerText=Object.values(country.currencies)[0].name + " ( " + Object.values(country.currencies)[0].symbol + " ) ";

   if(country.currencies){
    const currencies = Object.values(country.currencies);
    countryCurrency.innerText = currencies.
    map(currency => `${currency.name} (${currency.symbol})`).join(", ");
   }

   if(country.languages){
    countryLang.innerText = Object.values(country.languages).join(", ");
    console.log(Object.values(country.currencies));
   }

   if(country.borders){
    country.borders.forEach((border)=>{
        console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=> res.json())
        .then(([borderCountry])=>{
            console.log(borderCountry);
            const borderCountryTag = document.createElement('a');
            borderCountryTag.innerText =  borderCountry.name.common;
            borderCountryTag.href = `http://127.0.0.1:5500/country.html?name=${borderCountry.name.common}`
            countryBorders.append(borderCountryTag);

           // console.log(borderCountry.name.common)
        });
    })
   }

})

backBtn.addEventListener('click', (e)=>{
    history.back();
})


if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark');
    themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode';
}
else{
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
}


themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    countryImg.style.border = isDark
    ? `1px solid hsl(207, 26%, 17%)`
    : `1px solid #ccc`; 

    localStorage.setItem('theme',isDark? 'dark': 'light');
    
    themeChanger.innerHTML=isDark
     ? '<i class="fa-regular fa-sun"></i> &nbsp; Light Mode'
    : '<i class="fa-regular fa-moon"></i> &nbsp; Dark Mode';
})

