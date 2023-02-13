import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../../atoms";

const ToDoActionBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 2px;
  margin: 3px;
  cursor: pointer;
`;

const ToDoLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 5px 5px 13px;
  line-height: 16px;
`;

const ToDoSpan = styled.span`
  font-size: 14px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const handleDeleteBtn = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoLi>
      <ToDoSpan>{text}</ToDoSpan>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {category !== Categories.DOING && (
          <ToDoActionBtn name={Categories.DOING} onClick={onClick}>
            🏃‍♂️
          </ToDoActionBtn>
        )}
        {category !== Categories.TO_DO && (
          <ToDoActionBtn name={Categories.TO_DO} onClick={onClick}>
            🧍‍♀️
          </ToDoActionBtn>
        )}
        {category !== Categories.DONE && (
          <ToDoActionBtn name={Categories.DONE} onClick={onClick}>
            🙆‍♀️
          </ToDoActionBtn>
        )}
        <ToDoActionBtn onClick={handleDeleteBtn}>❌</ToDoActionBtn>
      </div>
    </ToDoLi>
  );
}

export default ToDo;
