import { useSetRecoilState } from "recoil";
import { mainFocusState, switchToFocusState } from "../../atoms";
import { List } from "./forEdit";

function DeleteBtn() {
  const deleteFocus = useSetRecoilState(mainFocusState);
  const setToSwitch = useSetRecoilState(switchToFocusState);
  const onClick = () => {
    deleteFocus("");
    setToSwitch(false);
  };
  return <List onClick={onClick}>Delete</List>;
}

export default DeleteBtn;
