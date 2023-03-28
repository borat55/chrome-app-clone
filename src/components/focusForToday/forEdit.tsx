import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mainFocusState, switchToFocusState } from "../../atoms";

export const List = styled.li`
  cursor: pointer;
  padding: 5px;
`;

function EditBtn() {
  const [editFocus, setEditFocus] = useRecoilState(mainFocusState);
  const setToSwitch = useSetRecoilState(switchToFocusState);
  const onClick = () => {};
  return <List onClick={onClick}>Edit</List>;
}

export default EditBtn;
