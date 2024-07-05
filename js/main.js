const searchInput = document.querySelector('.search-bar');

const firstDay = document.querySelector('.today');
const month = document.querySelector('.month');
const city = document.querySelector('.city');
const todayTemp = document.querySelector('.today-temp');
const conditionIcon = document.querySelector('.condition-icon');
const todayCondition = document.querySelector('.today-condition');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const compass = document.querySelector('.compass');

// next days 
const nextDay = document.querySelectorAll('.next-day');
const nextIcon = document.querySelectorAll('.weather-icon');
const nextMaxTemp = document.querySelectorAll('.next-max-temp');
const nextMinTemp = document.querySelectorAll('.next-min-temp');
const nextstate = document.querySelectorAll('.next-state');

async function getWeatherData(city) {
    let myRespose = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c172aa3b27242f599e140629242806&q=${city}&days=3`)
    let weatherData = await myRespose.json();
    return weatherData;
} 

// displayTodayData
function displayTodayData(myData) {

    let todayDate = new Date();
    firstDay.innerHTML = todayDate.toLocaleDateString("en-US", {weekday: "long"})
    month.innerHTML = `${todayDate.getDate()} ${todayDate.toLocaleDateString("en-US", {month: "long"})}`
    city.innerHTML = myData.location.name
    todayTemp.innerHTML = myData.current.temp_c + '&deg;C'
    conditionIcon.setAttribute('src', myData.current.condition.icon)
    todayCondition.innerHTML = myData.current.condition.text
    humidity.innerHTML = myData.current.humidity + '%'
    wind.innerHTML = myData.current.wind_mph + ' km/h'
    compass.innerHTML = myData.current.wind_dir[0]
}

// displayNextDayData
function displayNextDayData(data) {
    const myData =  data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(myData[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday: "long"})
        nextIcon[i].setAttribute('src',  myData[i+1].day.condition.icon)
        nextMaxTemp[i].innerHTML = myData[i+1].day.maxtemp_c + '&deg;C'
        nextMinTemp[i].innerHTML = myData[i+1].day.mintemp_c + '&deg;C'
        nextstate[i].innerHTML = myData[i+1].day.condition.text
    }
}


// launching
async function launchApp(city = 'cairo') {
    let myData = await getWeatherData(city);
    if (!myData.error) {
        displayTodayData(myData);
        displayNextDayData(myData);
    } else {
        console.error(myData.error.message);
    }
}

launchApp()

searchInput.addEventListener('input', function () {
        launchApp(searchInput.value)
})
