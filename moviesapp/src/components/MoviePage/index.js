import React, { useEffect, useState } from "react";
import "./style.css";
import { useContext } from "react";
import { movieContext } from "../../App";
import PropTypes from "prop-types";
import { LocalStorage } from "../../controllers/info";

export const MoviePage = () => {
  const [currentMovie, setCurrentMovie] = useState(
    useContext(movieContext).currentMovie
  );
  useEffect(() => {
    (async () => {
      if (!currentMovie) {
        const movie = await LocalStorage.getItem({ key: "currentMovie" });
        setCurrentMovie(movie);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        {currentMovie && currentMovie.videos.length ? (
          <YoutubeEmbed embedId={`${currentMovie.videos[2].key}`} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
