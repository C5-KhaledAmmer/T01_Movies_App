import { useEffect } from "react";
import "./App.css";
import { Movies } from "./controllers/movie";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";

const App = () => {
  useEffect(() => {
    (async () => {
      const movies = new Movies();
      await movies.getMovies("upcoming");
      console.log(movies.movies);

      // console.log(await movies.movies[3].getMovieImages());
      // console.log(await movies.movies[3].getMovieVideos());
      console.log(await movies.movies[5].getMovieReviews());
    })();
  });
  return (
    <div className="App">
      <Routes>
        <Route element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
