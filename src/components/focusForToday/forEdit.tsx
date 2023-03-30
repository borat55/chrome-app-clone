import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import {
  mainFocusState,
  switchToFocusState,
  strikethroughState,
  focusMenuState,
  speechBubbleState,
} from "../../atoms";

export const List = styled.li`
  cursor: pointer;
  padding: 5px;
`;

function EditBtn() {
  const setToSwitch = useSetRecoilState(switchToFocusState);
  const deleteFocus = useSetRecoilState(mainFocusState);
  const setStrikethrough = useSetRecoilState(strikethroughState);
  const setMenuOpen = useSetRecoilState(focusMenuState);
  const setMouseOver = useSetRecoilState(speechBubbleState);
  const onClick = () => {
    deleteFocus("");
    setStrikethrough(false);
    setMenuOpen(false);
    setMouseOver(false);
    setToSwitch(false);
  };
  return <List onClick={onClick}>Edit</List>;
}

export default EditBtn;
