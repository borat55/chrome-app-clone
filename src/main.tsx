import React, { useEffect, useState } from "react";
import ToDoList from "./components/toDoList/ToDoList";
import styled from "styled-components";
import DateYTime from "./components/DateYTime";
import Weather from "./components/Weather";
import QuoteForToday from "./components/Quotes";
import FocusForToday from "./components/focusForToday/FocusForToday";

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

export interface IRandomPhoto {
  id: string;
  alt_description: string;
  urls: { full: string; regular: string };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

function MyDesk() {
  const [randomPhotos, setRandomPhotos] = useState<IRandomPhoto | undefined>();
  let loadingRandomPhoto = true;
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_PATH = "https://api.unsplash.com";
    async function fetchMyAPI() {
      let response = await fetch(
        `${BASE_PATH}/photos/random?client_id=${API_KEY}`
      ).then((response) => response.json());
      setRandomPhotos(response);
    }
    fetchMyAPI();
  }, []);
  if (randomPhotos !== undefined) {
    loadingRandomPhoto = false;
  }

  const artistHref = `${randomPhotos?.user.links.html}?utm_source=chrome-app-clone&utm_medium=referral`;
  const unsplashHref =
    "https://unsplash.com/?utm_source=chrome-app-clone&utm_medium=referral";

  return (
    <>
      {loadingRandomPhoto ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          <Bground
            photo={randomPhotos?.urls.full || randomPhotos?.urls.regular || ""}
          />
          <BackgroundInfo>
            <span>Photo by </span>
            <a href={artistHref}>{randomPhotos?.user.name}</a>
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
