const API_KEY = "deb33e8e2b734e5aabe150423240812";

const API_URL_CURRENT = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=fr`;

const API_URL_FORECAST = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&lang=fr`;

// const conditions = `https://www.weatherapi.com/docs/weather_conditions.json`;

const current_temp = document.getElementById("current_temp");
var current_condition = document.getElementsByName("current_condition");

const hourly_forecast = document.getElementsByClassName("hourly-time");
const hourly_temp = document.getElementsByClassName("hourly-temperature");
const hourly_icon = document.getElementsByClassName("hourly-icon");

const hourly_forecast_mobile = document.getElementsByClassName("hourly-time-mobile");
const hourly_temp_mobile = document.getElementsByClassName("hourly-temperature-mobile");
const hourly_icon_mobile = document.getElementsByClassName("hourly-icon");

const forecast_time = document.getElementsByClassName("forecast-time");
const forecast_temp = document.getElementsByClassName("forecast-temperature");
const forecast_icon = document.getElementsByClassName("forecast-icon");

const backgroundImage = document.getElementById("background-image");

document.getElementById("city").addEventListener("change", async function () {
  const city = document.getElementById("city").value;

  const response_current = await fetch(API_URL_CURRENT + "&q=" + city);
  const data_current = await response_current.json();

  console.log(data_current);

  // const response_conditions = await fetch(conditions);
  // const data_conditions = await response_conditions.json();

  // console.log(data_conditions);

  current_temp.innerHTML = data_current.current.temp_c + "°C";

  for (var i = 0, max = current_condition.length; i < max; i++) {
    current_condition[i].innerHTML = data_current.current.condition.text;
  }

  const date = new Date(data_current.location.localtime_epoch * 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedTime = `${hour}:${minute < 10 ? "0" : ""}${minute}`;

    if (window.innerWidth < 768) {
        for (let i = 0; i < 4; i++) {
            const forecastHour = (hour + i + 1) % 24;
            const response_forecast = await fetch(API_URL_FORECAST + "&q=" + city + "&hour=" + forecastHour);
            const data_forecast = await response_forecast.json();
            hourly_forecast_mobile[i].innerHTML = forecastHour + ":00";
            hourly_temp_mobile[i].innerHTML =
                data_forecast.forecast.forecastday[0].day.avgtemp_c + "°C";
            hourly_icon[i].src =  data_forecast.forecast.forecastday[0].day.condition.icon ;
        }
    } else {
        for (let i = 0; i < 8; i++) {
            const forecastHour = (hour + i + 1) % 24;
            const response_forecast = await fetch(API_URL_FORECAST + "&q=" + city + "&hour=" + forecastHour);
            const data_forecast = await response_forecast.json();
            hourly_forecast[i].innerHTML = forecastHour + ":00";
            hourly_temp[i].innerHTML =
                data_forecast.forecast.forecastday[0].day.avgtemp_c + "°C";
            hourly_icon[i].src =  data_forecast.forecast.forecastday[0].day.condition.icon ;
        }
    }

  const response_forecast = await fetch(
    API_URL_FORECAST + "&q=" + city + "&days=7"
  );
  const data_forecast = await response_forecast.json();

    for (let i = 0; i < 7; i++) {
        forecast_time[i].innerHTML = data_forecast.forecast.forecastday[i].date_epoch;
        const date = new Date(data_forecast.forecast.forecastday[i].date_epoch * 1000);
        const options = { weekday: 'long', day: 'numeric', month: 'numeric' };
        forecast_time[i].innerHTML = date.toLocaleDateString(undefined, options);
        console.log(data_forecast.forecast.forecastday[i]);
        forecast_temp[i].innerHTML = data_forecast.forecast.forecastday[i].day.mintemp_c + "°C, " + data_forecast.forecast.forecastday[i].day.maxtemp_c + "°C";
        forecast_icon[i].src = data_forecast.forecast.forecastday[i].day.condition.icon ;
    }

    if (data_current.current.condition.text === "Couvert") {
        backgroundImage.style.backgroundColor = "#42C6FF";
    } else if (data_current.current.condition.text === "Nuage") {
        backgroundImage.style.backgroundColor = "#42C6FF";
    } else if (data_current.current.condition.text === "Plu") {
        backgroundImage.style.backgroundColor = "#FF64D4" ;
    }
});
