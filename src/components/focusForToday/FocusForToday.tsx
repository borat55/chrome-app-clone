import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  focusMenuState,
  mainFocusState,
  switchToFocusState,
  strikethroughState,
  speechBubbleState,
} from "../../atoms";
import HiddenMenu from "./hiddenMenu";
import AskFocus from "./askFocus";

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

const SpeechBubble = styled.div<{ mouseOver: boolean | undefined }>`
  display: ${(props) => (props.mouseOver ? "block" : "none")};
  padding: 3px;
`;

function FocusForToday() {
  const [menuOpen, setMenuOpen] = useRecoilState(focusMenuState);
  const mainFocus = useRecoilValue(mainFocusState);
  const toSwitch = useRecoilValue(switchToFocusState);
  const [strikethrough, setStrikethrough] = useRecoilState(strikethroughState);
  const [compliment, setCompliment] = useState("");
  const [mouseOver, setMouseOver] = useRecoilState(speechBubbleState);

  const onClick = () => {
    setCompliment("");
    setMenuOpen((current) => !current);
    setTimeout(function () {
      setMenuOpen(false);
      setMouseOver(false);
    }, 5000);
  };

  const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const msgs = ["Nice!", "Great work!", "Good job!", "Way to go!"];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    if (event.target.checked === true) {
      setMenuOpen(false);
      setStrikethrough(true);
      setCompliment(msg);
      setTimeout(function () {
        setCompliment("");
      }, 3000);
    }
    if (event.target.checked === false) {
      setMenuOpen(false);
      setCompliment("");
      setStrikethrough(false);
    }
  };

  const onMouseOver = () => {
    setMouseOver(true);
  };
  const onMouseLeave = () => {
    if (menuOpen === true) {
      setMouseOver(true);
    } else {
      setMouseOver(false);
      setMenuOpen(false);
    }
  };

  return (
    <div>
      {toSwitch ? (
        <FocusWCheckBox>
          <h1>TODAY</h1>
          <TodaysFocus onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <label>
              <input onChange={onChecked} type="checkbox" />
              {strikethrough ? (
                <del style={{ fontSize: 45 }}>{mainFocus}</del>
              ) : (
                <h1 style={{ fontSize: 45 }}>{mainFocus}</h1>
              )}
            </label>

            <SpeechBubble onClick={onClick} mouseOver={mouseOver}>
              💬
            </SpeechBubble>
          </TodaysFocus>
          <HiddenMenu />
          <span>{compliment}</span>
        </FocusWCheckBox>
      ) : (
        <AskFocus />
      )}
    </div>
  );
}

export default FocusForToday;
