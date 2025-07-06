// e7ee8d3eef8841bf898121809250107 apiKEY

// \\//\\//\\//\\//\\//\\ Element //\\//\\//\\//\\//\\ //\\
let currentDay = document.getElementById('currentDay');
let currentData = document.getElementById('currentData');
let nextDay = document.getElementById('NextDay');
let lastDay = document.getElementById('lastDay');
let cityName = document.getElementById('cityName');
let icon = document.getElementById('icon');
let degreeDay = document.getElementById('degreeDay');
let infoWeather = document.getElementById('infoW');
let iconNext = document.getElementById('iconNext');
let degreeTomorrow = document.getElementById('degreeTomorrow');
let minDegreeTomorrow = document.getElementById('minDegreeTomorrow');
let infoNext = document.getElementById('infoNext');
let iconLast = document.getElementById('iconLast');
let degreeLast = document.getElementById('degreeLast');
let minDegreeLast = document.getElementById('minDegreeLast');
let infoLast = document.getElementById('infoLast');
let search = document.getElementById('inp');
let displayNav = document.getElementById('displayNav')
let navbarItems = document.querySelector('.navbarItems')
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function getDayInfo(cityOrCoords) {
    let query = cityOrCoords;

    if (typeof cityOrCoords === 'object') {
        query = `${cityOrCoords.lat},${cityOrCoords.lon}`;
    }

    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7ee8d3eef8841bf898121809250107&q=${query}&days=3`);
    const response = await result.json();

    const dateStr = response.location.localtime;
    const dateObj = new Date(dateStr);

    const dayName = days[dateObj.getDay()];
    currentDay.innerHTML = dayName;

    const dayNumber = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];
    const formattedDate = `${dayNumber} ${monthName}`;
    currentData.innerHTML = formattedDate;

    const tomorrowDate = new Date(dateObj);
    tomorrowDate.setDate(dateObj.getDate() + 1);
    const lastDate = new Date(dateObj);
    lastDate.setDate(dateObj.getDate() + 2);

    nextDay.innerHTML = days[tomorrowDate.getDay()];
    lastDay.innerHTML = days[lastDate.getDay()];

    cityName.innerHTML = response.location.name;
    icon.innerHTML = `<img src="https:${response.current.condition.icon}" class="iconReal" alt="weather icon">`;
    infoWeather.innerHTML = response.current.condition.text;
    degreeDay.innerHTML = `${response.current.temp_c}°C`;

    const forecast = response.forecast.forecastday;

    const nextDayData = forecast[1];
    iconNext.innerHTML = `<img src="https:${nextDayData.day.condition.icon}" alt="weather icon">`;
    degreeTomorrow.innerHTML = `${nextDayData.day.avgtemp_c} °C`;
    minDegreeTomorrow.innerHTML = `${nextDayData.day.mintemp_c} °C`;
    infoNext.innerHTML = nextDayData.day.condition.text;

    const afterTomorrow = forecast[2];
    iconLast.innerHTML = `<img src="https:${afterTomorrow.day.condition.icon}" alt="weather icon">`;
    degreeLast.innerHTML = `${afterTomorrow.day.avgtemp_c} °C`;
    minDegreeLast.innerHTML = `${afterTomorrow.day.mintemp_c} °C`;
    infoLast.innerHTML = afterTomorrow.day.condition.text;
}

// ✅ Detect user's location automatically
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const coords = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            };
            getDayInfo(coords);
        },
        (error) => {
            console.warn("Location access denied or failed, using default.");
            getDayInfo("Cairo");
        }
    );
} else {
    console.warn("Geolocation not supported, using default.");
    getDayInfo("Cairo");
}


search.addEventListener('input', function (eventInfo) {
    let searched = eventInfo.target.value;
    if (searched.length >= 2) {
        getDayInfo(searched);
    }
});

displayNav.addEventListener('click', function () {
  navbarItems.classList.toggle('d-none');
  navbarItems.classList.toggle('d-flex');
});