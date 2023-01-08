const cityForm = document.querySelector('.form');
const details = document.querySelector('.data');
const box = document.querySelector('.box');
const time = document.querySelector('.box-img');
const icon = document.querySelector('.icon img');

const updateUI = data => {
  details.innerHTML = `
    <h5>${data.cityDetails.EnglishName}</h5>
    <div class="condition">${data.weatherDetails.WeatherText}</div>
    <div class="temp">
      <span>${data.weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // setting weather icon
  const iconSrc = `./images/icons/${data.weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc)

  // setting image for day and night
  let timeSrc = null;
  if(data.weatherDetails.IsDayTime){
    timeSrc = './images/day.svg';
  } else {
    timeSrc = './images/night.svg';
  }
  time.setAttribute('src', timeSrc)

  // showing box after submission
  if(box.classList.contains('d-none')){
    box.classList.remove('d-none');
  }
}

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return { cityDetails, weatherDetails };
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

})