const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.unsplash.com";

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

export function randomPhotosHandler() {
  return fetch(`${BASE_PATH}/photos/random?client_id=${API_KEY}`).then(
    (response) => response.json()
  );
}
