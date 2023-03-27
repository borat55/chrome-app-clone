import ToDoList from "./components/toDoList/ToDoList";
import styled from "styled-components";
import DateYTime from "./components/DateYTime";
import Weather from "./components/Weather";
import QuoteForToday from "./components/Quotes";
import FocusForToday from "./components/focusForToday/FocusForToday";

const Bground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-image: url(https://source.unsplash.com/random/1920x1080);
  position: absolute;
`;

function MyDesk() {
  return (
    <div>
      <Bground />
      <DateYTime />
      <Weather />
      <FocusForToday />
      <QuoteForToday />
      <ToDoList />
    </div>
  );
}

export default MyDesk;
