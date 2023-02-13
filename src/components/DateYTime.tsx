import styled from "styled-components";
import { useState } from "react";

const DateNTime = styled.div`
  position: relative;
  top: 250px;
  text-align: center;
  color: white;
  -webkit-text-stroke: 0.5px #f5f5f5;
  h1 {
    font-size: 100px;
  }
  h1:nth-child(3) {
    font-size: 70px;
    margin-top: 70px;
  }
  h3 {
    font-size: 70px;
    margin-bottom: 15px;
  }
`;

function DateYTime() {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };

  setInterval(updateTime, 1000);

  return (
    <DateNTime>
      <h3>{date}</h3>
      <h1>{currentTime}</h1>
    </DateNTime>
  );
}

export default DateYTime;
