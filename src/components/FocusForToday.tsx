import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { mainFocusState } from "../atoms";

const FocusWCheckBox = styled.div`
  position: relative;
  top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  -webkit-text-stroke: 0.5px #eeeeee;
  h1:first-child {
    font-size: 25px;
    margin-bottom: 20px;
  }
  span {
    margin-top: 30px;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    h1 {
      font-size: 45px;
      margin: 0 10px;
    }
    del {
      font-size: 45px;
      margin: 0 10px;
    }
    div {
      font-size: 18px;
    }
  }
`;

const TodaysFocus = styled.div`
  display: flex;
  align-items: center;
  label {
    cursor: pointer;
  }
  input {
    cursor: pointer;
  }
  div {
    cursor: pointer;
  }
`;

const AskFocus = styled.div`
  position: relative;
  bottom: -360px;
  display: flex;
  justify-content: center;
  color: white;
  -webkit-text-stroke: 0.5px #f5f5f5;
  h1 {
    font-size: 50px;
  }
  input {
    outline: none;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #f5f5f5;
    color: white;
    -webkit-text-stroke: 0.5px #f5f5f5;
    font-size: 50px;
    width: 300px;
    margin-left: 15px;
  }
`;

function FocusForToday() {
  const [compliment, setCompliment] = useState("");
  const [strikethrough, setStrikethrough] = useState(false);
  const [toSwitch, setToSwitch] = useState(false);
  const [mainFocus, setMainFocus] = useRecoilState(mainFocusState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMainFocus(event.currentTarget.value);
  };
  const showFocus = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && mainFocus !== "") {
      setToSwitch((current) => !current);
    }
  };
  const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const msgs = ["Nice!", "Great work!", "Good job!", "Way to go!"];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    if (event.target.checked === true) {
      setStrikethrough(true);
      setCompliment(msg);
      setTimeout(function () {
        setCompliment("");
      }, 3000);
    }
    if (event.target.checked === false) {
      setCompliment("");
      setStrikethrough(false);
    }
  };

  return (
    <div>
      {toSwitch ? (
        <FocusWCheckBox>
          <h1>TODAY</h1>
          <TodaysFocus>
            <label>
              <input onChange={onChecked} type="checkbox" />
              {strikethrough ? (
                <del style={{ fontSize: 45 }}>{mainFocus}</del>
              ) : (
                <h1 style={{ fontSize: 45 }}>{mainFocus}</h1>
              )}
            </label>
            <div>💬</div>
          </TodaysFocus>
          <span>{compliment}</span>
        </FocusWCheckBox>
      ) : (
        <AskFocus>
          <h1>What is your focus today?</h1>
          <input onChange={onChange} onKeyDown={showFocus} type="text" />
        </AskFocus>
      )}
    </div>
  );
}

export default FocusForToday;
