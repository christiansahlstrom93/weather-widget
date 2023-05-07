declare module "reactjs-weather" {
  interface IReactWeatherProps {
    lon?: number;
    lat?: number;
    city?: string;
    useCelsius?: boolean;
    apiKey?: string;
    backgroundColor?: string;
    color?: string;
    iconTheme?: "DARK" | "LIGHT";
  }
  const ReactWeather: (props: IReactWeatherProps) => JSX.Element;
}
