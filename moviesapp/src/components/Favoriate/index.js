import React, { useContext, useEffect, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
import { movieContext } from "../../App";
import { LocalStorage } from "../../controllers/info";
import { buildMovieCard } from "../HomePage";
import { buildModel } from "../MoviePage/MovieCard";
import "./style.css";
export const Favorite = () => {
  const [movies, setMovies] = useState(null);
  const { setCurrentMovie } = useContext(movieContext);
  const [showModel, setShowModel] = useState(false);

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
          fAccept:()=>{},
          fCancel:()=>{}
        })
      ) : (
        <></>
      )}
      {movies ? (
        movies.map((movie) => {
          return (
            <div className="fav-card-div">
              <div className="close-div">
                <CloseButton onClick={() => {}} />
              </div>

              {buildMovieCard(movie, setCurrentMovie)}
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
