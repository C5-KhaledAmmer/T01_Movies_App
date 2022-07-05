import React, { useEffect, useState } from "react";
import { Movies } from "../../controllers/movie";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const instance = new Movies();
      const { movies } = await instance.getMovies();
      setMovies(movies);
    })();
  }, []);
  return (
    <div className="main-home-page-div">
      <div>
        {movies.map(movie =>{
            return <h1>{movie.id}</h1>
        })}
      </div>
    </div>
  );
};
