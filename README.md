# Weather widget in React

A React library that will provide you with a widget that shows weather for the four next days. We are using data from SMHI (The Swedish Meteorological and Hydrological Institute).

Full [documentation](https://algobook.info/docs/reactjs-weather).

### Other free projects and APIs

For more cool and free open source projects and APIs, check out our [website](https://algobook.info/opensource)

## Example widget of weather in Copenhagen

![image](https://storage.googleapis.com/algobook/weather-widget/Screenshot%202023-04-10%20at%2011.38.19.png)

## Change color of the widget

If needed, the color and icons can now be changed with optional props.

![Color](https://storage.googleapis.com/algobook/weather-widget/Screenshot%202023-04-24%20at%2020.47.10.png)

## Some notes

- You can provide the widget with your own latitude and longitude, but you don't have to. However, if no values are provided, the widget will fetch from the _navigator.geolocation_ API, which means that the user must have accepted the browser to know its location.
- We support both Celsius and Farenheit units.
- We now support changing the colors and icons for the widget
- The widget is just created, and we love to improve it. So if any feedback or feature requests, or more important, any bug findings - please reach out. You can find email etc on our website.

Please go to our website for more information and full documentation on how it is used, [algobook.info](https://algobook.info/)
