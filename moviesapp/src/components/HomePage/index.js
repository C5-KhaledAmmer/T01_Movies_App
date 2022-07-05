import React, { useContext, useEffect, useState } from "react";
import { Movies } from "../../controllers/movie";
import { Card } from "react-bootstrap";
import { Info } from "../../controllers/info";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { movieContext } from "../../App";
export const HomePage = () => {
  const {setCurrentMovie} = useContext(movieContext
    )
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
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
        <Link onClick={()=>{
          setCurrentMovie(movie)
        }} to={`/movie/${movie.id}/${movie.title}`}>
          <Card.Img
            variant="top"
            src={`${Info.imagesUrl + movie.poster_path}`}
          />
        </Link>

        <Card.Body>
          <div className="card-details-div">
            <Link to={`/movie/${movie.id}/${movie.title}`}>
              <Card.Title>{movie.title}</Card.Title>
            </Link>
            <h6>{movie.release_date}</h6>
            <div>
              {movie.genre_ids.length ? (
                movie.genre_ids.map((genre) => {
                  return <small key={genre + movie.id}>{genre + ", "}</small>;
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="main-home-page-div">
      <div className="cards-div">
        <h1>Action</h1>
        <div className="inner-cards-div">
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
