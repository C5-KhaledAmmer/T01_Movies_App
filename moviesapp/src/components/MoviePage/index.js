import React, { useEffect } from "react";

import { useContext } from "react";
import { movieContext } from "../../App";
import { Card } from "react-bootstrap";
import { Info } from "../../controllers/info";
import PropTypes from "prop-types";

export const MoviePage = () => {
  let { currentMovie } = useContext(movieContext);
  useEffect(() => {
    (async () => {
      if (currentMovie) {
        await currentMovie.getMovieDetails();
        await currentMovie.getMovieImages();
        await currentMovie.getMovieVideos();
      }
      console.log(currentMovie);
    })();
  }, []);

  return (
    <div>
      <div>
        {
          <Card>
            <YoutubeEmbed embedId="rokGy0huYEA" />

            <Card.Img
              variant="top"
              src={`${Info.imagesUrl + currentMovie.poster_path}`}
            />

            <Card.Body>
              <div className="card-details-div">
                <Card.Title>{currentMovie.title}</Card.Title>
                <h6>{currentMovie.release_date}</h6>
                <div>
                  {currentMovie.genre_ids.length ? (
                    currentMovie.genre_ids.map((genre) => {
                      return (
                        <small key={genre + currentMovie.id}>
                          {genre + ", "}
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
        }
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
