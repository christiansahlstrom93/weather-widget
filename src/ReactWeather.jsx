import { useEffect, useState } from "react";
import { getWeatherData, getWeatherDataFromCity } from "./service";
import sun from "./icons/sunny.svg";
import partiallyClouds from "./icons/littleSun.svg";
import cloudy from "./icons/cloudy.svg";
import fog from "./icons/fog.svg";
import rain from "./icons/rain.svg";
import thunder from "./icons/thunder.svg";
import snow from "./icons/snow.svg";
import heavysnow from "./icons/heavysnow.svg";
import clearnight from "./icons/clearnight.svg";
import cloudynight from "./icons/cloudynight.svg";
import arrow from "./icons/south.svg";

import sun_bright from "./bright_icons/sunny.svg";
import partiallyClouds_bright from "./bright_icons/littleSun.svg";
import cloudy_bright from "./bright_icons/cloudy.svg";
import fog_bright from "./bright_icons/fog.svg";
import rain_bright from "./bright_icons/rain.svg";
import thunder_bright from "./bright_icons/thunder.svg";
import snow_bright from "./bright_icons/snow.svg";
import heavysnow_bright from "./bright_icons/heavysnow.svg";
import clearnight_bright from "./bright_icons/clearnight.svg";
import cloudynight_bright from "./bright_icons/cloudynight.svg";
import arrow_bright from "./bright_icons/south.svg";

import "./styles.css";

const ICON_MAP = {
  1: sun,
  2: partiallyClouds,
  3: partiallyClouds,
  4: partiallyClouds,
  5: cloudy,
  6: cloudy,
  7: fog,
  8: rain,
  9: rain,
  10: rain,
  11: thunder,
  12: snow,
  13: snow,
  14: snow,
  15: snow,
  16: heavysnow,
  17: heavysnow,
  18: rain,
  19: rain,
  20: rain,
  21: thunder,
  22: rain,
  23: heavysnow,
  24: heavysnow,
  25: snow,
  26: heavysnow,
  27: heavysnow,
};

const NIGHT_ICONS = {
  ...ICON_MAP,
  1: clearnight,
  2: cloudynight,
  3: cloudynight,
  4: cloudynight,
};

const ICON_MAP_BRIGHT = {
  1: sun_bright,
  2: partiallyClouds_bright,
  3: partiallyClouds_bright,
  4: partiallyClouds_bright,
  5: cloudy_bright,
  6: cloudy_bright,
  7: fog_bright,
  8: rain_bright,
  9: rain_bright,
  10: rain_bright,
  11: thunder_bright,
  12: snow_bright,
  13: snow_bright,
  14: snow_bright,
  15: snow_bright,
  16: heavysnow_bright,
  17: heavysnow_bright,
  18: rain_bright,
  19: rain_bright,
  20: rain_bright,
  21: thunder_bright,
  22: rain_bright,
  23: heavysnow_bright,
  24: heavysnow_bright,
  25: snow_bright,
  26: heavysnow_bright,
  27: heavysnow_bright,
};

const NIGHT_ICONS_BRIGHT = {
  ...ICON_MAP_BRIGHT,
  1: clearnight_bright,
  2: cloudynight_bright,
  3: cloudynight_bright,
  4: cloudynight_bright,
};

export const ReactWeather = (props) => {
  const {
    lat,
    lon,
    useCelsius = true,
    apiKey,
    iconTheme = "DARK",
    backgroundColor,
    color,
    city,
  } = props;
  const [coordinates, setCoordinates] = useState({
    latitude: lat,
    longitude: lon,
  });

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      if (city) {
        const data = await getWeatherDataFromCity(city, useCelsius);
        setWeatherData(data);
      } else if (coordinates.latitude && coordinates.longitude) {
        const data = await getWeatherData(
          coordinates.latitude,
          coordinates.longitude,
          useCelsius,
          apiKey
        );
        setWeatherData(data);
      }
    }
    fetchWeather();
  }, [coordinates.latitude, coordinates.longitude, useCelsius, apiKey, city]);

  if (!city && (!coordinates.latitude || !coordinates.longitude)) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser");
      return null;
    }
  }

  if (!weatherData) {
    return null;
  }

  const renderUpcomingDays = (data) => {
    return (
      <div className="upcomingWrapper">
        {data.map((day) => (
          <div key={day.formattedDay} className="dayCell">
            <span className="dayTextSmall">{day.formattedDay}</span>
            <div className="smallIconWrapper">
              <img
                className="weatherSymbolSmall"
                src={
                  iconTheme === "LIGHT"
                    ? ICON_MAP_BRIGHT[day.symbol]
                    : ICON_MAP[day.symbol]
                }
                alt="sun"
              />
            </div>
            <div className="infoRowSlim">
              <div>
                <span>{`H:${day.maxTemp}°`}</span>
                <span className="minTempSlim">{`L:${day.minTemp}°`}</span>
              </div>
              <div className="smallRow">
                <span>{`${day.windAverage} m/s`}</span>
                <img
                  style={{ transform: `rotate(${day.windDirection}deg)` }}
                  className="arrowIconSlim"
                  src={iconTheme === "LIGHT" ? arrow_bright : arrow}
                  alt="wind direction"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderToday = (data) => {
    const now = new Date().getHours();
    const isNigth = now >= 20 || now < 4;
    return (
      <div className="todayWrapper">
        <div className="topRow">
          <span className="cityName">{weatherData.city}</span>
          <span className="cityName">{data.formattedDay}</span>
        </div>
        <div className="todayContainer">
          <img
            src={
              isNigth
                ? iconTheme === "LIGHT"
                  ? NIGHT_ICONS_BRIGHT[data.symbol]
                  : NIGHT_ICONS[data.symbol]
                : iconTheme === "LIGHT"
                ? ICON_MAP_BRIGHT[data.symbol]
                : ICON_MAP[data.symbol]
            }
            alt="sun"
          />
          <div className="infoRow">
            <span>{`H:${data.maxTemp}°`}</span>
            <span>{`L:${data.minTemp}°`}</span>
            <span>{`${data.windAverage} m/s`}</span>
            <img
              style={{ transform: `rotate(${data.windDirection}deg)` }}
              className="arrowIcon"
              src={iconTheme === "LIGHT" ? arrow_bright : arrow}
              alt="wind direction"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="widget" style={{ backgroundColor, color }}>
      {renderToday(weatherData.data[0])}
      {renderUpcomingDays(weatherData.data.slice(1, 4))}
    </div>
  );
};
