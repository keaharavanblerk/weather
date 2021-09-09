import React from "react";

import './App.css';

import Weather from "./app-component/weather.component";
import Form from './app-component/form.component';

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "ae42b121deef030220b001b2383b6286";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.getWeather();

    this.weatherIcon = {
      Thunderstorm: "bi-thunderstorm",
      Drizzle: "bi-sleet",
      Rain: "bi-strom-showers",
      Snow: "bi-snow",
      Atmosphere: "bi-fog",
      Clear: "bi-day-sunny",
      Clouds: "bi-day-fog"
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: "bi-lightning-charge-fill" });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: "bi-cloud-drizzle-fill" });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: "bi-cloud-rain-fill" });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: " bi-snow2" });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: "bi-thermometer" });
        break;
      case rangeId === 800:
        this.setState({ icon: "bi-sun-fill" });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: "bi-clouds-fill" });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  };

  getWeather = async (city, country) => {

    if (city && country) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
