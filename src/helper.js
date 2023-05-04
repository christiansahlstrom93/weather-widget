export const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sortByTemp = (a, b) => {
  if (a.temp < b.temp) {
    return -1;
  } else if (a.temp > b.temp) {
    return 1;
  }
  return 0;
};

export const getAverage = (data, value) => {
  const mapped = data.map((d) => d[value]);
  const avarage = (array) => array.reduce((a, b) => a + b) / array.length;
  return avarage(mapped);
};

export const sortByDates = (a, b) => {
  if (a.day.getTime() < b.day.getTime()) {
    return -1;
  } else if (b.day.getTime() < a.day.getTime()) {
    return 1;
  }
  return 0;
};

export const formatDay = (day) => {
  const today = new Date().setHours(0, 0, 0, 0);
  if (day.setHours(0, 0, 0, 0) === today) {
    return "Today";
  }

  const testTomorrow = new Date();
  testTomorrow.setDate(testTomorrow.getDate() + 1);
  if (
    testTomorrow.getFullYear() === day.getFullYear() &&
    testTomorrow.getMonth() === day.getMonth() &&
    testTomorrow.getDate() === day.getDate()
  ) {
    return "Tomorrow";
  }

  return day.toLocaleDateString("en-us", { weekday: "short" });
};

export const getMiddleValue = (data, key) => {
  const mapped = data.map((d) => d[key]);
  const middle = Math.round(mapped.length / 2);
  const middleValue = mapped[mapped.length < 2 ? 0 : middle];
  return middleValue;
};

export const convertToFarenheit = (celsius) => {
  return Math.round(celsius * 1.8 + 32);
};

export const getCity = async (lat, lon, apiKey) => {
  if (!apiKey) {
    return "";
  }
  const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${lat},${lon}`;
  const googleRespone = await fetch(googleUrl);
  const jsonGoogle = await googleRespone.json();

  const prospects = jsonGoogle.results
    .map((r) => ({
      city: r.address_components.find((comp) =>
        comp.types.includes("postal_town")
      )?.short_name,
    }))
    .filter((comp) => comp.city);
  return prospects[0]?.city;
};
