import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const ToDoListDiv = styled.div`
  width: 300px;
  height: 270px;
  background-color: #fafafa;
  border-radius: 15px;
`;
const Select = styled.select`
  position: fixed;
  border: none;
  outline: none;
  background-color: transparent;
  margin: 10px;
`;

const ListBox = styled.div`
  width: 300px;
  height: 170px;
  position: relative;
  top: 37px;
  overflow-y: scroll;
`;

function ToDoList() {
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "40px",
        bottom: "60px",
      }}
    >
      <ToDoListDiv>
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>TO DO</option>
          <option value={Categories.DOING}>DOING</option>
          <option value={Categories.DONE}>DONE</option>
        </Select>
        <ListBox>
          {toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />).reverse()}
        </ListBox>

        <CreateToDo />
        {/* {category === "TO_DO" &&
        toDo.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DOING" &&
        doing.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)}
      {category === "DONE" &&
        done.map((aToDo) => <ToDo key={aToDo.id} {...aToDo} />)} */}
      </ToDoListDiv>
    </div>
  );
}

export default ToDoList;
