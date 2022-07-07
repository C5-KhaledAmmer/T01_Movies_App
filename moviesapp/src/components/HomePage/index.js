import React, { useContext, useEffect, useState } from "react";
import { Movies } from "../../controllers/movie";
import { Card } from "react-bootstrap";
import { Info, LocalStorage } from "../../controllers/info";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { movieContext } from "../../App";
export const HomePage = () => {
  const { setCurrentMovie } = useContext(movieContext);
  const [newMovies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const navigate = useNavigate();
  const moviesType = [
    { title: "popular", setState: setPopularMovies },
    { title: "upcoming", setState: setUpcomingMovies },
    { title: "top_rated", setState: setTopMovies },
    { title: "now_playing", setState: setMovies },
  ];
  useEffect(() => {
    (async () => {
      moviesType.forEach(async (type) => {
        const instance = new Movies();
        await instance.getMovies(type.title);
        type.setState(instance.movies);
      });
    })();
  }, []);
  const showMore = () => {};
  const CreateSection = (movies, title) => (
    <div className="cards-div">
      <h1 index={title} className="title-section">{title}</h1>
      <div className="inner-cards-div">
        {movies.length ? (
          movies.map((movie) => {
            return buildMovieCard(movie, setCurrentMovie, "", navigate);
          })
        ) : (
          <></>
        )}
      </div>
      <button onClick={showMore} className="show-more-btn">
        Show More
      </button>
    </div>
  );
  return (
    <div className="main-home-page-div">
      {CreateSection(newMovies, "Now Playing")}
      {CreateSection(topRatedMovies, "Top Rated")}
      {CreateSection(popularMovies, "popular")}
      {CreateSection(upcomingMovies, "upcoming")}
    </div>
  );
};
export const buildMovieCard = (movie, setCurrentMovie, key = "", navigate) => {
  return (
    <Card key={movie.title + movie.id + movie.release_date + key}>
      <Link
        onClick={async () => {
          setCurrentMovie(movie);
          await LocalStorage.setItem({ key: "currentMovie", value: movie });
        }}
        to={`/movie/${movie.id}/${movie.title}`}
      >
        <Card.Img variant="top" src={`${Info.imagesUrl + movie.poster_path}`} />
      </Link>

      <Card.Body>
        <div className="card-details-div">
          <Card.Title
            onClick={() => {
              navigate("/movie/${movie.id}/${movie.title}");
            }}
          >
            {movie.title}
          </Card.Title>

          <h6>{movie.release_date}</h6>
          <div>
            {movie.genre_ids.length ? (
              movie.genre_ids.map((genre) => {
                return (
                  <small key={genre + movie.id + key}>{genre + ", "}</small>
                );
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
