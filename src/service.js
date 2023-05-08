import {
  convertToFarenheit,
  formatDay,
  getAverage,
  getCity,
  getMiddleValue,
  groupBy,
  sortByDates,
  sortByTemp,
} from "./helper";

export const getWeatherDataFromCity = async (city, unit) => {
  const respone = await fetch(
    `https://weather.algobook.info/forecast?city=${city}`
  );
  const weatherData = await respone.json();
  const weatherDays = weatherData.forecast.map((day) => {
    return {
      ...day,
      minTemp: unit === "metric" ? day.minTempCelsius : day.minTempFarenheit,
      maxTemp: unit === "metric" ? day.maxTempCelsius : day.maxTempFarenheit,
      windAverage: unit === "metric" ? day.windAverageMs : day.windAverageMph,
    };
  });
  const cityName = weatherData.city.name;

  return { city: cityName, data: weatherDays.splice(0, 4) };
};

export const getWeatherData = async (lat, lon, useCelsius, apiKey) => {
  const response = await fetch(
    `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${Number(
      lon
    ).toFixed(3)}/lat/${Number(lat).toFixed(3)}/data.json`
  );
  const weatherData = await response.json();
  const parsed = weatherData.timeSeries.map((time) => {
    const fullDate = new Date(time.validTime);
    return {
      day: new Date(
        fullDate.getFullYear(),
        fullDate.getMonth(),
        fullDate.getDate()
      ),
      temp: time.parameters.find((p) => p.name === "t")?.values[0],
      symbol: time.parameters.find((p) => p.name === "Wsymb2")?.values[0],
      windPerSecond: time.parameters.find((p) => p.name === "ws")?.values[0],
      windDirection: time.parameters.find((p) => p.name === "wd")?.values[0],
    };
  });
  const weatherDays = mapWeather(parsed, useCelsius);

  const city = await getCity(lat, lon, apiKey);

  return { data: weatherDays.splice(0, 4), city: city ?? "" };
};

const mapWeather = (parsedData, useCelsius) => {
  const grouped = groupBy(parsedData, "day");
  const weatherDays = [];
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort(sortByTemp);
    weatherDays.push({
      day: new Date(key),
      data: grouped[key].map((d) => ({
        temp: d.temp,
        symbol: d.symbol,
        windPerSecond: d.windPerSecond,
        windDirection: d.windDirection,
      })),
    });
  });

  weatherDays.forEach((day) => {
    day.formattedDay = formatDay(day.day);
    day.minTemp = useCelsius
      ? Math.round(day.data[0].temp)
      : convertToFarenheit(Math.round(day.data[0].temp));
    day.maxTemp = useCelsius
      ? Math.round(day.data[day.data.length - 1].temp)
      : convertToFarenheit(Math.round(day.data[day.data.length - 1].temp));
    day.windAverage = Math.round(getAverage(day.data, "windPerSecond"));
    day.windDirection = Math.round(getAverage(day.data, "windDirection"));
    day.symbol = getMiddleValue(day.data, "symbol");
  });

  weatherDays.sort(sortByDates);
  return weatherDays;
};
