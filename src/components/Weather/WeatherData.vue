<template>
  <div class="container">
    <div class="weather">
      <h3 class="weather-title">{{ weatherData.location.name }}</h3>
      <p>
        {{
          new Date(weatherData.location.localtime).toLocaleDateString("ru-ru", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.location.localtime).toLocaleTimeString("ru-ru", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="deg">{{ Math.round(weatherData.current.temp_c) }}&deg;</p>
      <p>Feels like {{ Math.round(weatherData.current.feelslike_c) }}&deg;</p>
      <p>{{ weatherData.current.condition.text }}</p>
      <img
        :src="weatherData.current.condition.icon"
        alt="icon"
        class="weather-icon"
      />
    </div>
    <hr class="line" />
    <div class="hourly-container">
      <h4>Hourly Weather</h4>
      <div class="hourly">
        <div
          v-for="hourData in weatherData.forecast.forecastday[0].hour"
          :key="hourData.time"
        >
          <p>
            {{
              new Date(hourData.time).toLocaleTimeString("ru-ru", {
                hour: "numeric",
              })
            }}
          </p>
          <img :src="hourData.condition.icon" alt="icon" />
          <p>{{ Math.round(hourData.temp_c) }}&deg;</p>
        </div>
      </div>
    </div>
    <hr class="line" />
    <div class="forecast-container">
      <h4 class="forecast-title">3 Day Forecast</h4>
      <div
        v-for="day in weatherData.forecast.forecastday"
        :key="day.date"
        class="forecast"
      >
        <p class="day">
          {{
            new Date(day.date)
              .toLocaleDateString("ru-ru", {
                weekday: "long",
              })
              .replace(/^./, (char) => char.toUpperCase())
          }}
        </p>
        <img :src="day.day.condition.icon" alt="icon" />
        <div class="temp-container">
          <p>Max: {{ Math.round(day.day.maxtemp_c) }}&deg;</p>
          <p>Min: {{ Math.round(day.day.mintemp_c) }}&deg;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

const { city } = defineProps({
  city: {
    type: String,
    required: true,
  },
});

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=11248aa345d4458b96283937251505&q=${city}&days=3&aqi=no&alerts=no`
    );

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
</script>

<style scoped>
.container {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.line {
  border: 1px solid rgba(14, 114, 131, 0.5);
  width: 100%;
}

.weather {
  text-align: center;
}

.weather-title {
  margin: 10px;
}

.deg {
  font-size: 50px;
  margin: 20px;
}

.weather-icon {
  width: 100px;
}

.hourly-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.hourly {
  display: flex;
  text-align: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
  gap: 10px;
  margin: 10px;
  max-width: 50%;
}

.hourly::-webkit-scrollbar {
  height: 10px;
}

.hourly::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}

.hourly::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.hourly::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.forecast-container {
  width: 100%;
  margin: 10px;
}

.forecast-title {
  text-align: center;
}

.forecast {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
}

.day,
.temp-container {
  flex: 1;
}

.temp-container {
  text-align: right;
}
</style>
