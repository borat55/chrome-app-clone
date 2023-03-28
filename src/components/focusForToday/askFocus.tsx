import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  DefaultValue,
} from "recoil";
import styled from "styled-components";
import { mainFocusState, switchToFocusState } from "../../atoms";
import { useForm } from "react-hook-form";

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

interface IForm {
  focus: string;
}

function AskFocus() {
  const [mainFocus, setMainFocus] = useRecoilState(mainFocusState);
  const setToSwitch = useSetRecoilState(switchToFocusState);

  const { register, handleSubmit } = useForm<IForm>({
    defaultValues: {
      focus: mainFocus,
    },
  });

  const showFocus = (data: IForm) => {
    setMainFocus(data.focus);
    setToSwitch((current) => !current);
  };
  return (
    <WriteFocus>
      <h1>What is your focus today?</h1>
      <form onSubmit={handleSubmit(showFocus)}>
        <input {...register("focus", { required: true })} type="text" />
      </form>
    </WriteFocus>
  );
}

export default AskFocus;
