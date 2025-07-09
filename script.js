function getweather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const url = `https://weather-app-p1m5.onrender.com/api/weather?city=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.weather.cod === '404') {
                displayNotFound(data.weather.message);
            } else {
                displayWeather(data.weather);
                displayHourlyForecast(data.forecast.list);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching weather data');
        });
}

function displayNotFound(message) {
    const tempinfo = document.getElementById('temp');
    const weatherinfo = document.getElementById('info');
    const weathericon = document.getElementById('icon');
    const hourlyforecast = document.getElementById('forecast');

    tempinfo.innerHTML = '';
    weatherinfo.innerHTML = `<p>${message}</p>`;
    weathericon.style.display = 'none';
    hourlyforecast.innerHTML = '';
}

function displayWeather(data) {
    const tempinfo = document.getElementById('temp');
    const weatherinfo = document.getElementById('info');
    const weathericon = document.getElementById('icon');
    const hourlyforecast = document.getElementById('forecast');

    // Clear previous content
    weatherinfo.innerHTML = '';
    hourlyforecast.innerHTML = '';
    tempinfo.innerHTML = '';

    const cityname = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconcode = data.weather[0].icon;
    const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityname}</p><p>${description}</p>`;

    tempinfo.innerHTML = temperatureHTML;
    weatherinfo.innerHTML = weatherHTML;
    weathericon.src = iconurl;
    weathericon.alt = description;
    weathericon.style.display = 'block';
}

function displayHourlyForecast(hourlydata) {
    const hourlyforecast = document.getElementById('forecast');
    hourlyforecast.innerHTML = ''; 

    const next24hours = hourlydata.slice(0, 8); // Next 24 hours = 8 x 3h blocks

    next24hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyItemHTML = `
            <div class="item">
                <span>${hour}:00</span>
                <img src="${iconurl}" alt="Hourly weather icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyforecast.innerHTML += hourlyItemHTML;
    });
}
