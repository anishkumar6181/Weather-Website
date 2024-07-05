function frequent(number) {
  var count = 0;
  var sortedNumber = number.sort();
  var start = number[0],
    item;
  for (var i = 0; i < sortedNumber.length; i++) {
    if (start === sortedNumber[i] || sortedNumber[i] === sortedNumber[i + 1]) {
      item = sortedNumber[i];
    }
  }
  return item;
}

function showTime(datetime) {
  let now = new Date(datetime);
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let hour = now.getHours();
  let amPm = "AM";
  if (hour > 12) {
    amPm = "PM";
  }
  convertHour();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  document.querySelector("#clock").innerHTML = `${hour}:${minute}`;
  document.querySelector("#day").innerHTML = day;
  document.querySelector("#date").innerHTML = `${date} ${month} ${year}`;
  document.querySelector("#amPm").innerHTML = amPm;

  function convertHour() {
    if (hour <= 9) {
      hour = `0${hour}`;
    } else if (hour > 9 && hour <= 12) {
      return hour;
    } else if (hour > 12 && hour <= 21) {
      hour = hour - 12;
      hour = `0${hour}`;
    } else {
      hour = hour - 12;
    }
  }
}

let celcius = null;
let celciousFeelsLike = null;
let fahrenheit = null;
let fahrenheitFeelsLike = null;
let unit = null;

function showTemperature(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let temp = response.data.main.temp;
  let description = response.data.weather[0].description;
  let cloudines = Math.round(response.data.clouds.all);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let feelsLike = response.data.main.feels_like;
  let icon = response.data.weather[0].icon;
  showTime(new Date(response.data.dt * 1000));

  celcius = temp;
  celciousFeelsLike = feelsLike;
  fahrenheit = temp;
  fahrenheitFeelsLike = feelsLike;

  document.querySelector("#temperature").innerHTML = Math.round(temp);
  document.querySelector("#city").innerHTML = `${city}, ${country}`;
  document.querySelector("#description").innerHTML = description;
  document.querySelector("#cloudines").innerHTML = cloudines;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(feelsLike);
  document.querySelector("#icon").setAttribute("src", `images/${icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", description);
  document.body.style.backgroundImage = `url(images/background/${icon}@2x.png)`;
}

// 5-days weather forecast with minimum & maximum temperature from each day
function getForecast(forecast) {
  let array = forecast.data.list;

  //Maximum Temperature within 5-days
  let tempMax5days = [];
  let tempMaxDay = [];
  let tempMax = [];

  for (let i = 0; i < array.length; i++) {
    tempMax.push(array[i].main.temp_max);
  }

  for (let j = 0; j < 5; j++) {
    //console.log(tempMax);
    tempMaxDay[j] = tempMax.splice(8);
    //console.log(tempMaxDay[j]);
    //console.log(tempMax);
    tempMax5days.push(Math.round(Math.max(...tempMax)));
    //console.log(tempMax5days);
    tempMax = tempMaxDay[j];
  }
  // console.log(`Maximum temperature in 5-days: ${tempMax5days}`);

  //Minimum Temperature within 5-days
  let tempMin5days = [];
  let tempMinDay = [];
  let tempMin = [];

  for (let i = 0; i < array.length; i++) {
    tempMin.push(array[i].main.temp_min);
  }

  for (let j = 0; j < 5; j++) {
    //console.log(tempMin);
    tempMinDay[j] = tempMin.splice(8);
    //console.log(tempMinDay[j]);
    //console.log(tempMin);
    tempMin5days.push(Math.round(Math.min(...tempMin)));
    //console.log(tempMin5days);
    tempMin = tempMinDay[j];
  }
  // console.log(`Minimum temparature in 5-days: ${tempMin5days}`);

  //name of the day for the next 5-days
  let time5days = [];
  let timeEveryDay = [];
  let timeEvery3hour = [];

  for (let k = 0; k < array.length; k++) {
    timeEvery3hour.push(array[k].dt);
  }
  //console.log(timeEvery3hour);

  for (let l = 0; l < 5; l++) {
    timeEveryDay[l] = timeEvery3hour.splice(8);
    time5days.push(Math.max(...timeEvery3hour));
    timeEvery3hour = timeEveryDay[l];
  }
  //console.log(time5days);

  let newTime5days = [];
  for (let m = 0; m < 5; m++) {
    newTime5days.push(formatDay(time5days[m] * 1000));
  }
  // console.log(newTime5days);

  //get the icon for 5days
  let icon5days = [];
  let iconsPerDay = [];
  let icons = [];

  for (let i = 0; i < array.length; i++) {
    icons.push(array[i].weather[0].icon);
  }
  //console.log(icons);

  for (let j = 0; j < 5; j++) {
    iconsPerDay[j] = icons.splice(8);
    icon5days.push(frequent(icons));
    icons = iconsPerDay[j];
  }
  //console.log(icon5days);

  // Display the 5-days Forecast
  let forcastElement = document.querySelector("#forecast");
  forcastElement.innerHTML = null;

  for (let i = 0; i < 5; i++) {
    forcastElement.innerHTML += `
    <div class="col">
      <h3>${newTime5days[i]}</h3>
      <img
    class="forecast"
    src="https://openweathermap.org/img/wn/${icon5days[i]}@2x.png"
    alt=""
  />
      <span class="prediction"><strong>${tempMax5days[i]}°</strong>/${tempMin5days[i]}°</span>
    </div>
  `;
  }

  function formatDay(timestamp) {
    let now = new Date(timestamp);

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[now.getDay()];

    return day;
  }
}

function searchCity(city) {
  if (celciusLink.classList.value === "active") {
    unit = "metric";
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  } else {
    unit = "imperial";
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }

  let apiKey = "3d63e956d93780759b6b69f1f1853436";
  let targetUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${targetUrl}q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  targetUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  apiUrl = `${targetUrl}q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(getForecast);
}

function showPosition(position) {
  if (celciusLink.classList.value === "active") {
    unit = "metric";
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  } else {
    unit = "imperial";
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3d63e956d93780759b6b69f1f1853436";
  let targetUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${targetUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  targetUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  apiUrl = `${targetUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(getForecast);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
document
  .querySelector("#currentLocation")
  .addEventListener("click", searchCurrentLocation);

function handleClick(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;

  searchCity(city);
}
document.querySelector("#search-form").addEventListener("submit", handleClick);

function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheit = (celcius * 9) / 5 + 32;
  fahrenheitFeelsLike = (celciousFeelsLike * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheit);
  document.querySelector("#feels-like").innerHTML = Math.round(
    fahrenheitFeelsLike
  );
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#toFahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  celcius = ((fahrenheit - 32) * 5) / 9;
  celciousFeelsLike = ((fahrenheitFeelsLike - 32) * 5) / 9;
  document.querySelector("#temperature").innerHTML = Math.round(celcius);
  document.querySelector("#feels-like").innerHTML = Math.round(
    celciousFeelsLike
  );
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}
let celciusLink = document.querySelector("#toCelcius");
celciusLink.addEventListener("click", convertToCelcius);

function searchCities(event) {
  event.preventDefault();
  let targetCity = event.target.innerHTML;

  searchCity(targetCity);
}
document.querySelector("#Mumbai").addEventListener("click", searchCities);
document.querySelector("#Kolkata").addEventListener("click", searchCities);
document.querySelector("#Hyderabad").addEventListener("click", searchCities);
document.querySelector("#newdelhi").addEventListener("click", searchCities);
document.querySelector("#Chennai").addEventListener("click", searchCities);

//default
searchCity("Mumbai");
