const main = document.querySelector('main');
const form = document.querySelector('#select-location');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newDiv = document.createElement('div');
  newDiv.className = 'location';

  const userInput = form.elements.input.value;

  const getWeatherData = await fetch(`https://weatherdbi.herokuapp.com/data/weather/${userInput}`).json();

  if (getWeatherData.status === 'fail' && !document.querySelector('#select-location p')) {
    const errorMsg = document.createElement('p');
    errorMsg.innerText = 'Please, enter a valid location!';
    form.appendChild(errorMsg);
  } else {
    if (document.querySelector('#select-location p')) {
      const errorMsg = document.querySelector('#select-location p');
      errorMsg.remove();
    }

    const title = document.createElement('p');
    title.innerText = getWeatherData.region;
    title.setAttribute('id', 'title');

    const {
      currentConditions: {
        comment,
        temp,
        iconURL,
        precip
      }
    } = getWeatherData;

    const condition = document.createElement('p');
    condition.innerText = 'Weather condition: ' + comment;

    const temperature = document.createElement('p');
    temperature.innerText = 'Temperature: ' + temp.c + ' °C';

    const icon = document.createElement('img');
    icon.setAttribute('src', iconURL);

    const precipitation = document.createElement('p');
    precipitation.innerText = 'Precipitation: ' + precip;

    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'x';
    newDiv.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
      newDiv.remove();
    });

    newDiv.appendChild(title);
    newDiv.appendChild(icon);
    newDiv.appendChild(condition);
    newDiv.appendChild(temperature);
    newDiv.appendChild(precipitation);

    main.appendChild(newDiv);
  }
});