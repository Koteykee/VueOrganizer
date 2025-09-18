<template>
  <div class="container">
    <div>
      <h3>{{ weatherData.location.name }}</h3>
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
      <p>{{ Math.round(weatherData.current.temp_c) }}&deg;</p>
      <p>Feels like {{ Math.round(weatherData.current.feelslike_c) }}&deg;</p>
      <p>{{ weatherData.current.condition.text }}</p>
      <img :src="weatherData.current.condition.icon" alt="icon" />
    </div>
    <hr class="line" />
    <div>
      <div>
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
    </div>
    <hr class="line" />
    <div>
      <div>
        <h4>3 Day Forecast</h4>
        <div
          v-for="day in weatherData.forecast.forecastday"
          :key="day.date"
          class="hourly"
        >
          <p>
            {{
              new Date(day.date)
                .toLocaleDateString("ru-ru", {
                  weekday: "long",
                })
                .replace(/^./, (char) => char.toUpperCase())
            }}
          </p>
          <img :src="day.day.condition.icon" alt="icon" />
          <div>
            <p>Max: {{ Math.round(day.day.maxtemp_c) }}&deg;</p>
            <p>Min: {{ Math.round(day.day.mintemp_c) }}&deg;</p>
          </div>
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
      `http://api.weatherapi.com/v1/forecast.json?key=11248aa345d4458b96283937251505&q=${city}&days=3&aqi=no&alerts=no`
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

.hourly {
  display: flex;
}
</style>
