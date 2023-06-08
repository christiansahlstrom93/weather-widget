declare module "reactjs-weather" {
  interface IReactWeatherProps {
    lon?: number;
    lat?: number;
    city?: string;
    unit?: "metric" | "imperial";
    widgetStyle?: any;
    borderColor?: string;
    apiKey?: string;
    iconTheme?: "DARK" | "LIGHT";
    Image?: any;
  }
  const ReactWeather: (props: IReactWeatherProps) => JSX.Element;
}
