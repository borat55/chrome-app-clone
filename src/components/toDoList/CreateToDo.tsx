import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../atoms";
import { categoryState } from "../../atoms";

const ToDoForm = styled.form`
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 12px;
  width: 80%;
  color: #9e9e9e;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #9e9e9e;
  margin-right: 6px;
`;

const ErrorMsg = styled.span`
  margin-left: 15px;
  font-size: 13px;
  color: red;
  display: block;
`;

interface IForm {
  toDo: string;
}
function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    defaultValues: { toDo: "Tell yourself 'YOU CAN DO IT'" },
  });

  const handleValid = (data: IForm) => {
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <div>
      <ToDoForm onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("toDo", {
            required: "Please fill what you want to do today",
          })}
          placeholder="Write a new Todo"
        />

        <Button>Add</Button>
      </ToDoForm>
      <ErrorMsg>{errors.toDo?.message}</ErrorMsg>
    </div>
  );
}

export default CreateToDo;
