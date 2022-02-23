//Global variables
var input = document.getElementById('input');
var button = document.getElementById('button');
var currentResult = document.getElementById('results');
var futureResult = document.getElementById('future');
var recentSearch = document.getElementById('recentSearch');
var APIkey = '5c7dfdfd5ab6e65e0abb1a5485abdf5b'

//Get lat and lon of city
var getCord = (city) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            getWeather(data);
        })
}

//Get weather of city
var getWeather = (data) => {
    var lat = data[0].lat;
    var lon = data[0].lon
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            currentWeather(data);
            futureWeather(data);
        })
}

//Make card for current weather
function currentWeather({ current }) {
    currentResult.innerHTML = "";
    var condition = document.createElement('p');
    condition.textContent = `Weather Condition: ${current.weather[0].main}`;

    var tempurature = document.createElement('p');
    var temp = Math.floor(((current.temp - 273.15) * 9 / 5 + 32))
    tempurature.textContent = `Tempurature: ${temp} F`;

    var humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${current.humidity} %`;

    var windspeed = document.createElement('p');
    var speed = Math.floor(current.wind_speed * 2.23694)
    windspeed.textContent = `Wind Speed: ${speed} mph`;

    var uvi = document.createElement('p');
    uvi.textContent = `UV Index: ${current.uvi}`;

    currentResult.append(condition);
    currentResult.append(tempurature);
    currentResult.append(humidity);
    currentResult.append(windspeed);
    currentResult.append(uvi);
}

//Make card for 5-day forecast
function futureWeather(data) {
    futureResult.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        var futureCard = document.createElement('div')
        futureCard.setAttribute('class', 'card');

        var dateEl = document.createElement('p');
        dateEl.textContent = (new Date(data.daily[i].dt * 1000)).toLocaleDateString("en-US");

        var condition = document.createElement('p');
        condition.textContent = `Weather Condition: ${data.daily[i].weather[0].main}`;

        var tempurature = document.createElement('p');
        var temp = Math.floor(((data.daily[i].temp.day - 273.15) * 9 / 5 + 32))
        tempurature.textContent = `Tempurature: ${temp} F`;

        var humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${data.daily[i].humidity} %`;

        var windspeed = document.createElement('p');
        var speed = Math.floor(data.daily[i].wind_speed * 2.23694)
        windspeed.textContent = `Wind Speed: ${speed} mph`;

        futureCard.append(dateEl);
        futureCard.append(condition);
        futureCard.append(tempurature);
        futureCard.append(humidity);
        futureCard.append(windspeed);

        futureResult.append(futureCard);
    }
}

var recentView = [];

//Lists recent searches
function recent() {
    recentSearch.innerHTML = "";
    var recentCity = JSON.parse(localStorage.getItem("viewed"));
    for (let j = 0; j < recentView.length; j++) {
        var recent = document.createElement('p');
        recent.textContent = recentCity[j];
        recentSearch.append(recent);
    }
}

//Fills the storage
function fillStorage() {
    var storage = JSON.parse(localStorage.getItem("viewed"));
    if (storage != null) {
        recentView = storage;
    }
}

//Clicking on recent searches
recentSearch.addEventListener('click', function (event) {
    getCord(event.target.textContent);
})

//Finding weather for a city
button.addEventListener('click', function (event) {
    event.preventDefault;
    recentView.push(input.value)
    localStorage.setItem("viewed", JSON.stringify(recentView));
    getCord(input.value);
    recent();
})

fillStorage();