import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const ToDoListDiv = styled.div<{ toDoMenu: boolean }>`
  display: ${(props) => (props.toDoMenu ? "block" : "none")};
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

const ToDoBtn = styled.button`
  cursor: pointer;
  font-size: 25px;
  margin-top: 5px;
  border: none;
  background-color: transparent;
  color: white;
  -webkit-text-stroke: 0.5px #f5f5f5;
`;

function ToDoList() {
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);
  const [toDoMenu, showToDoMenu] = useState(true);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onClick = () => {
    showToDoMenu((current) => !current);
  };

  return (
    <div
      style={{
        position: "absolute",
        right: "40px",
        bottom: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <ToDoListDiv toDoMenu={toDoMenu}>
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
      <ToDoBtn onClick={onClick}>TODO</ToDoBtn>
    </div>
  );
}

export default ToDoList;
