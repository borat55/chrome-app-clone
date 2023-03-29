import styled from "styled-components";
import React, { useState } from "react";

const ForecastBox = styled.div`
  width: 150px;
  overflow: hidden;
  height: auto;
  position: absolute;
  right: 50px;
  top: 50px;
  padding: 20px;
  border-radius: 15px;
  background-color: white;
`;

const Location = styled.input`
  width: 100px;
  height: 20px;
  border: none;
  outline: none;
  ::placeholder {
    opacity: 0.5;
  }
`;

const WeatherInfo = styled.div`
  margin-top: 10px;
  line-height: 20px;

  h1 {
    margin-top: 10px;
    font-size: 17px;
  }
  h1:nth-child(1) {
    font-weight: 600;
    font-size: 20px;
  }
  h1:nth-child(4) {
    margin-bottom: 10px;
  }
`;

const ChooseCity = styled.div`
  margin: 10px 10px 15px 10px;
  line-height: 30px;
  font-size: 20px;
`;

interface IWeather {
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];

  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  visibility: number;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };

  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
  };

  id: number;
  name: string;
}

function Weather() {
  const [weather, getWeather] = useState<IWeather>();
  const [location, setLocation] = useState("");
  const [warning, setWarning] = useState(
    "Please enter the name of the city above."
  );

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a95242c70cd17fc56e938050c5b774ba&units=metric`;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = await (await fetch(url)).json();
    if (json.cod === 200 && location !== "") {
      getWeather(json);
      setLocation("");
    } else if (json.cod !== 200) {
      setWarning("please enter the correct city name.");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setLocation(event.currentTarget.value);
  };

  return (
    <ForecastBox>
      <form onSubmit={onSubmit}>
        <Location
          onChange={onChange}
          required={true}
          placeholder="e.g. Seoul"
          value={location}
          type="text"
        />
        {weather ? (
          <WeatherInfo>
            <h1>
              {weather?.name}, {weather?.sys?.country}
            </h1>
            <h1>Temp : {weather?.main?.temp} °C</h1>
            <h1>Humidity : {weather?.main?.humidity}</h1>
            <h1>We are expecting {weather?.weather[0]?.description} today.</h1>
          </WeatherInfo>
        ) : (
          <ChooseCity>{warning}</ChooseCity>
        )}
      </form>
    </ForecastBox>
  );
}

export default Weather;
