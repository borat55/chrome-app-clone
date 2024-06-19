import React, { useEffect, useState } from "react";
import ToDoList from "./components/toDoList/ToDoList";
import styled from "styled-components";
import DateYTime from "./components/DateYTime";
import Weather from "./components/Weather";
import QuoteForToday from "./components/Quotes";
import FocusForToday from "./components/focusForToday/FocusForToday";
import { randomPhotosHandler, IRandomPhoto } from "./api";
import { useQuery } from "react-query";

const Loader = styled.h1`
  height: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 150px;
`;

const Bground = styled.div<{ photo: string }>`
  min-height: 100vh;
  width: 100vw;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  position: absolute;
`;

const BackgroundInfo = styled.div`
  display: flex;
  position: absolute;
  color: white;
  -webkit-text-stroke: 0.5px #f5f5f5;
  padding-top: 10px;

  span {
    padding-left: 10px;
  }
  a {
    padding-left: 10px;
  }
`;

function MyDesk() {
  const { data: randomPhoto, isLoading: loadingRandomPhoto } =
    useQuery<IRandomPhoto>(["randomPhotos"], randomPhotosHandler);

  const artistHref = `${randomPhoto?.user.links.html}?utm_source=chrome-app-clone&utm_medium=referral`;
  const unsplashHref =
    "https://unsplash.com/?utm_source=chrome-app-clone&utm_medium=referral";

  return (
    <>
      {loadingRandomPhoto ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          <Bground
            photo={randomPhoto?.urls.full || randomPhoto?.urls.regular || ""}
          />
          <BackgroundInfo>
            <span>Photo by </span>
            <a href={artistHref}>{randomPhoto?.user.name}</a>
            <span> on </span>
            <a href={unsplashHref}>Unsplash</a>
          </BackgroundInfo>
          <DateYTime />
          <Weather />
          <FocusForToday />
          <QuoteForToday />
          <ToDoList />
        </div>
      )}
    </>
  );
}

export default React.memo(MyDesk);
