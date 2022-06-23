const main = document.querySelector('main');
const form = document.querySelector('#select-location');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newLocation = document.createElement('div');
  newLocation.className = 'location';

  const userInput = form.elements.input.value;

  const res = await fetch('https://weatherdbi.herokuapp.com/data/weather/' + userInput);
  const weatherData = await res.json();

  if (weatherData.status === 'fail') {
    const errorMsg = document.createElement('p');
    errorMsg.innerText = 'Please, enter a valid location!';
    form.appendChild(errorMsg);
  } else {
    if (document.querySelector('#select-location p')) {
      const errorMsg = document.querySelector('#select-location p');
      errorMsg.remove();
    }

    const title = document.createElement('p');
    title.innerText = weatherData.region;
    title.setAttribute('id', 'title');
    const condition = document.createElement('p');
    condition.innerText = 'Weather condition: ' + weatherData.currentConditions.comment;
    const temperature = document.createElement('p');
    temperature.innerText = 'Temperature: ' + weatherData.currentConditions.temp.c + ' °C';
    const icon = document.createElement('img');
    icon.setAttribute('src', weatherData.currentConditions.iconURL);
    const precipitation = document.createElement('p');
    precipitation.innerText = 'Precipitation: ' + weatherData.currentConditions.precip;

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'x';
    newLocation.appendChild(closeBtn);
    closeBtn.addEventListener('click', () => {
      newLocation.remove();
    });

    newLocation.appendChild(title);
    newLocation.appendChild(icon);
    newLocation.appendChild(condition);
    newLocation.appendChild(temperature);
    newLocation.appendChild(precipitation);

    main.appendChild(newLocation);
  }
});