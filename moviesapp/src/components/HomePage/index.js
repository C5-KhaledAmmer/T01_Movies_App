import React, { useEffect, useState } from "react";
import { Movies } from "../../controllers/movie";
import { Button, Card } from "react-bootstrap";
import { Info } from "../../controllers/info";
import "./style.css"
export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const instance = new Movies();
      await instance.getMovies("popular");
      setMovies(instance.movies);
    })();
  }, []);
  const buildMovieCard = (movie) => {
     return (
      <Card>
        <Card.Img variant="top" src={`${Info.imagesUrl + movie.poster_path}`} />
        <Card.Body>
          <Card.Title>{movie.genre_ids[0]}</Card.Title>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="main-home-page-div">
      <div className="cards-div">
        <div  className="inner-cards-div">
        {movies.length ? (
          movies.map((movie) => {
            return buildMovieCard(movie);
          })
        ) : (
          <></>
        )}
        </div>
      </div>
    </div>
  );
};
