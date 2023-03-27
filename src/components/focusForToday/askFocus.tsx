import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { mainFocusState, switchToFocusState } from "../../atoms";

const WriteFocus = styled.div`
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

function AskFocus() {
  const [mainFocus, setMainFocus] = useRecoilState(mainFocusState);
  const setToSwitch = useSetRecoilState(switchToFocusState);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMainFocus(event.currentTarget.value);
  };

  const showFocus = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && mainFocus !== "") {
      setToSwitch((current) => !current);
    }
  };
  return (
    <WriteFocus>
      <h1>What is your focus today?</h1>
      <input onChange={onChange} onKeyDown={showFocus} type="text" />
    </WriteFocus>
  );
}

export default AskFocus;
