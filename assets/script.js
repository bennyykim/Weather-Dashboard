var input = document.getElementById('input');
var button = document.getElementById('button');
var APIkey = '5c7dfdfd5ab6e65e0abb1a5485abdf5b'
var getCord = (city) => {
    console.log('this part working');
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`)
    .then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        getWeather(data);
    })
}

var getWeather = (data) => {
    var lat = data[0].lat;
    var lon = data[0].lon
    console.log(lat);
    console.log(lon);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
    })
}

button.addEventListener('click', function (event) {
    event.preventDefault;
    console.log(input.value);
    getCord(input.value);
})
