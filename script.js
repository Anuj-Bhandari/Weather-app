require('dotenv').config();

function getweather(){

    const api = process.env.WEATHER_API_KEY ;
    
    const city = document.getElementById('city').value
 
    if(!city){
        alert('please enter a city')
        return ;
    }

    const currentweatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;

    fetch(currentweatherurl)
    .then(response => response.json())
    .then(data=> {
        displayWeather(data)
    })
    .catch(error => {
        console.error('error fetching data:',error);
        alert('error fetching weather data')
    })

    fetch(forecasturl)
    .then(response => response.json())
    .then(data=>{
        displayhourlyforecast(data.list);
    })
    .catch(error =>{
        console.log('error fetching hourly forecast:' , error);
        alert('error fetching forecast data')
    })
}

function displayWeather(data) {

    const tempinfo = document.getElementById('temp')
    const weatherinfo = document.getElementById('info')
    const weathericon = document.getElementById('icon')
    const hourlyforecast = document.getElementById('forecast')
    
    //clear html previous content
    weatherinfo.innerHTML = ""
    hourlyforecast.innerHTML = ""
    tempinfo.innerHTML = ""

    if(data.cod === '404'){
        weatherinfo.innerHTML = `<p>${data.message}</p>`;
    }else {
        const cityname = data.name;
        const temperature = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].description
        const iconcode = data.weather[0].icon
        const iconurl= `https://openweathermap.org/img/wn/${iconcode}@4x.png` ;
    
    
    const temperatureHTML = `<p>${temperature}°C<p/>`;

    const weatherHTML = `<p>${cityname}</p>
        <p>${description}</p>`
    
        tempinfo.innerHTML = temperatureHTML;
        weatherinfo.innerHTML = weatherHTML;
        weathericon.src = iconurl;
        weathericon.alt = description ;

        showImage();
    }
}

function displayhourlyforecast(hourlydata){

    const hourlyforecast = document.getElementById('forecast')
    const next24hours = hourlydata.slice(0,8)

    next24hours.forEach(item => {
        const dateTime = new Date(item.dt *1000)
        const hour = dateTime.getHours()
        const temperature = Math.round(item.main.temp - 273.15)
        const  iconcode = item.weather[0].icon
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`
   
        const hourlyItemHTML = `
        <div class="item" > 
        <span> ${hour}:00</span> 
        <img src="${iconurl}" alt="Hourly weather icon">
        <span> ${temperature}°C </span>
        </div>
        `
        hourlyforecast.innerHTML += hourlyItemHTML;
    });
}

function showImage(){

    const weatherIcon = document.getElementById('icon');
    weatherIcon.style.display = 'block'
}
