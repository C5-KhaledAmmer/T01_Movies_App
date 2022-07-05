import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { movieContext } from "../../App";

export const MoviePage = () => {
  let { id } = useParams();
  let{ currentMovie} = useContext(movieContext);
  useEffect(() => {
    (async () => {
      if (currentMovie) {
        await currentMovie.getMovieDetails();
      }
    })();
  }, []);

  return <></>;
};
