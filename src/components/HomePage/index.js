import React, { useContext, useEffect, useState } from "react";
import { Movies } from "../../controllers/movie";
import { Card } from "react-bootstrap";
import { Info, LocalStorage } from "../../controllers/info";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { movieContext } from "../../App";
export const HomePage = () => {
  const { setCurrentMovie } = useContext(movieContext);
  const [newMovies, setMovies] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [topRatedMovies, setTopMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
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
        type.setState(instance);
        console.log(instance);
      });
    })();
  }, []);
  const showMore = async (instance, setState, title) => {
    title = title.toLowerCase().replaceAll(" ", "_");
    const newMovies = new Movies(instance.movies);
    newMovies.page = instance.page + 1;
    await newMovies.getMovies(title);
    setState(newMovies);
  };
  const CreateSection = (instance, title, setState) => {
    return (
      <div className="cards-div">
        <section id={title}>
          <h1 className="title-section">{title}</h1>
        </section>
        <div className="inner-cards-div">
          {instance && instance.movies.length ? (
            instance.movies.map((movie) => {
              return buildMovieCard(movie, setCurrentMovie, "", navigate);
            })
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={() => {
            showMore(instance, setState, title);
          }}
          className="show-more-btn"
        >
          Show More
        </button>
      </div>
    );
  };
  return (
    <div className="main-home-page-div">
      {CreateSection(newMovies, "Now Playing", setMovies)}
      {CreateSection(topRatedMovies, "Top Rated", setTopMovies)}
      {CreateSection(popularMovies, "Popular", setPopularMovies)}
      {CreateSection(upcomingMovies, "Upcoming", setUpcomingMovies)}
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
              navigate(`/movie/${movie.id}/${movie.title}`);
            }}
          >
            {movie.title}
          </Card.Title>

          <h6>{movie.release_date}</h6>
          <div>
            {movie.genre_ids.length ? (
              movie.genre_ids.map((genre,index) => {
                return (
                  <small  key={genre + movie.id}>
                  {genre +
                    `${
                      index + 1 !== movie.genre_ids.length ? ", " : " "
                    }`}
                </small>
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
