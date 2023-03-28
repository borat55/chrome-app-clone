import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { focusMenuState } from "../../atoms";
import EditBtn from "./forEdit";
import DeleteBtn from "./forDelete";

const Options = styled.ul<{ menuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100px;
  height: 50px;
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
`;

function HiddenMenu() {
  const menuOpen = useRecoilValue(focusMenuState);
  return (
    <Options menuOpen={menuOpen}>
      <EditBtn />
      <DeleteBtn />
    </Options>
  );
}

export default HiddenMenu;
