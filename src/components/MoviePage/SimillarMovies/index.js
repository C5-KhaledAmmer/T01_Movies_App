import React, { useContext, useEffect, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { movieContext } from "../../../App";
import { buildMovieCard } from "../../HomePage";

import "./style.css";
export const SimilarMovies = ({currentMovie}) => {
  const navigate = useNavigate();
  const { setCurrentMovie } = useContext(movieContext);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [movieCurrent, setMovieCurrent] = useState(null);
  useEffect(()=>{
    (async ()=>{
      await currentMovie.getSimilarMovie();
      setMovieCurrent(currentMovie)
    })()
  },[])
  return (
    <div>
       <h1 className="imagesSection">Similar Movies</h1>
       <div className="inner-cards-div">
      {movieCurrent && movieCurrent.similarMovies.length ? (
        movieCurrent.similarMovies.map((movie) => {
          return (
            <div className="fav-card-div">

              {buildMovieCard(movie, setCurrentMovie, "cn", navigate)}
            </div>
          );
        })
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
    </div>
    
  );
};
