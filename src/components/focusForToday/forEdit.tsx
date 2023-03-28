import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { switchToFocusState } from "../../atoms";

export const List = styled.li`
  cursor: pointer;
  padding: 5px;
`;

function EditBtn() {
  const setToSwitch = useSetRecoilState(switchToFocusState);
  const onClick = () => {
    setToSwitch(false);
  };
  return <List onClick={onClick}>Edit</List>;
}

export default EditBtn;
