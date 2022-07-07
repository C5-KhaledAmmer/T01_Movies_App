import React, { useContext, useEffect, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { movieContext } from "../../App";
import { LocalStorage } from "../../controllers/info";
import { buildMovieCard } from "../HomePage";
import { buildModel } from "../MoviePage/MovieCard";
import "./style.css";
export const Favorite = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState(null);
  const { setCurrentMovie } = useContext(movieContext);
  const [showModel, setShowModel] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  useEffect(() => {
    (async () => {
      const movies = await LocalStorage.getItem({ key: "fav-movies" });
      setMovies(movies);
    })();
  }, []);

  return (
    <div className="inner-cards-div">
      {showModel ? (
        buildModel({
          title: "Remove Movie",
          body: "You will remove this movie, are you sure?",
          fAccept: () => {
            setShowModel(false);
            deleteFromStorage(movies, setMovies, currentMovieId);
          },
          fCancel: () => {
            setShowModel(false);
          },
        })
      ) : (
        <></>
      )}
      {movies && movies.length ? (
        movies.map((movie) => {
          return (
            <div className="fav-card-div">
              <div className="close-div">
                <CloseButton
                  onClick={() => {
                    setShowModel(true);
                    setCurrentMovieId(movie.id);
                  }}
                />
              </div>

              {buildMovieCard(movie, setCurrentMovie, "f", navigate)}
            </div>
          );
        })
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};
async function deleteFromStorage(movies, setMovies, id) {
  movies = movies.filter((movie) => {
    return movie.id !== id;
  });
  await LocalStorage.setItem({ key: "fav-movies", value: movies });
  setMovies(movies);
}
