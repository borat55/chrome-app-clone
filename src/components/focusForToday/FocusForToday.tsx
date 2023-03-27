import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { mainFocusState } from "../../atoms";

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

const SpeechBubble = styled.div<{ mouseOver: boolean | undefined }>`
  display: ${(props) => (props.mouseOver ? "block" : "none")};
  padding: 3px;
`;
const HiddenMenu = styled.ul<{ menuOpen: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 70px;
  background-color: gray;
  display: ${(props) => (props.menuOpen ? "block" : "none")};
  position: relative;
  bottom: 10px;
  right: -85px;
  transition: 1s;
  border-radius: 13px;
  padding: 10px 10px 15px 10px;
  margin: 10px;
  &::after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid gray;
    content: "";
    position: absolute;
    top: -10px;
    left: 13px;
  }
  li {
    cursor: pointer;
    padding: 5px;
  }
`;

function FocusForToday() {
  const [compliment, setCompliment] = useState("");
  const [strikethrough, setStrikethrough] = useState(false);
  const [toSwitch, setToSwitch] = useState(false);
  const [mainFocus, setMainFocus] = useRecoilState(mainFocusState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const onClick = () => {
    setCompliment("");
    setMenuOpen(true);
    setTimeout(function () {
      setMenuOpen(false);
      setMouseOver(false);
    }, 5000);
  };

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
          <HiddenMenu menuOpen={menuOpen}>
            <li>Delet</li>
            <li>Edit</li>
            <li>New Focus</li>
          </HiddenMenu>
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
