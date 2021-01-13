
const container = document.getElementById('wethers__container');
const form = document.getElementById('weather__form');
const input = document.getElementById('city-input');
const apiKey = '4fff8905814411cff17d73827d52294f';
let weathers = [];
//Build weather DOM
function buildWeather() {
    //clear
    container.textContent = '';
    //Build items
    weathers.forEach((weather) => {
        const { City, Temp, IconSrc, Description, createDate } = weather;
        console.log(City, Temp, IconSrc, Description, createDate);
        //Item
        const item = document.createElement('div');
        item.classList.add('item');
        //tools
        const tools = document.createElement('div');
        tools.classList.add('tools');
        //date
        const date = document.createElement('div');
        date.classList.add('date');
        date.textContent = createDate;
        //delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-times');
        deleteIcon.setAttribute('title', 'Usunąć');
        deleteIcon.setAttribute('id', 'delete');
        deleteIcon.setAttribute('onclick', `deleteWeather('${createDate}')`);

        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city');
        cityDiv.textContent = City;
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('city-temp');
        tempDiv.textContent = Temp;
        const Deg = document.createElement('sup');
        Deg.textContent = '°C';
        const descrDiv = document.createElement('div');
        descrDiv.classList.add('temp_description');
        descrDiv.textContent = Description;
        const iconDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = IconSrc;

        // append
        tempDiv.appendChild(Deg);
        iconDiv.appendChild(img);
        tools.append(date, deleteIcon);
        item.append(tools, cityDiv, tempDiv, iconDiv, descrDiv);
        container.appendChild(item);
    });
}

function fetchWeather() {
    if (localStorage.getItem('pogoda')) {
        weathers = JSON.parse(localStorage.getItem('pogoda'));
    } else {
        weathers = [];
        localStorage.setItem('pogoda', JSON.stringify(weathers));
    }
    buildWeather();
}
// eslint-disable-next-line no-unused-vars
function deleteWeather(createDate) {
    weathers.forEach((weather, i) => {
        if (weather.createDate === createDate) {
            weathers.splice(i, 1);
        }
    });
    //update LS
    localStorage.setItem('pogoda', JSON.stringify(weathers));
    fetchWeather();
}

function storeWeather(e) {
    e.preventDefault();
    const inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            let city = data.name;
            let cityTemp = Math.round(data.main.temp);
            let imgSrc = `http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
            let description = data.weather[0]['description'];
            const weather = {
                City: city,
                Temp: cityTemp,
                createDate: new Date().toLocaleString(),
                IconSrc: imgSrc,
                Description: description,
            };
            weathers.push(weather);
            localStorage.setItem('pogoda', JSON.stringify(weathers));
            fetchWeather();
        })
        .catch(function () {});
}

form.addEventListener('submit', storeWeather);
fetchWeather();
