import React, { useEffect, useState } from "react";
import "./style.css";
import { useContext } from "react";
import { movieContext } from "../../App";
import PropTypes from "prop-types";
import { Info, LocalStorage } from "../../controllers/info";
import { Card, Carousel } from "react-bootstrap";

export const MoviePage = () => {
  const btns = [
    {
      text: "Add To Favorite ♡",
      onClick: async () => {
        await SaveInLocalStorage(currentMovie);
      },
    },
    { text: "Home Page ˂ ", onClick: () => {} },
  ];
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
  const buildMovieCard = (movie) => {
    console.log(movie);
    return (
      <div className="movie-page-card">
        {movie.poster_path ? (
          <img src={`${Info.imagesUrl + movie.poster_path}`} />
        ) : (
          <></>
        )}
        <Card.Body>
          <h1>{movie.title}</h1>
          <br />
          <p>{movie.overview}</p>

          {movie.poster_path.vote_count >= 0 ? (
            <div className="release-votes">
              <h4>{"Release Date: " + movie.release_date}</h4>
              <h4>{"Votes: " + movie.vote_count}</h4>
            </div>
          ) : (
            <></>
          )}

          <div className="release-votes">
            <div className="release-votes">
              <h6>{"Genres:  "}</h6>
              {movie.genre_ids.length ? (
                movie.genre_ids.map((genre) => {
                  return <small key={genre + movie.id}>{genre + ", "}</small>;
                })
              ) : (
                <></>
              )}
            </div>
            {currentMovie ? (
              <h6>{"Status: " + movie.status}</h6>
            ) : (
              <h6>{"Status: " + "Released"}</h6>
            )}

            {movie && movie.vote_count ? (
              <h6>{`Vote Count: ${movie.vote_count}`}</h6>
            ) : (
              <></>
            )}
          </div>

          <div className="release-votes">
            {movie && movie.budget ? (
              <h6>{`Budget: ${movie.budget} $`}</h6>
            ) : (
              <></>
            )}

            {movie && movie.revenue ? (
              <h6>{`Vote Avg: ${movie.revenue} $`}</h6>
            ) : (
              <></>
            )}

            {movie && movie.vote_average ? (
              <h6>{`Vote Avg: ${movie.vote_average}`}</h6>
            ) : (
              <></>
            )}
          </div>
          {btns.map((ele) => {
            return (
              <button className="btns-card" onClick={ele.onClick}>
                {ele.text}
              </button>
            );
          })}
        </Card.Body>
      </div>
    );
  };

  return (
    <div>
      <div>
        {currentMovie && currentMovie.videos.length ? (
          <YoutubeEmbed embedId={`${currentMovie.videos[2].key}`} />
        ) : (
          <></>
        )}
        {currentMovie ? buildMovieCard(currentMovie) : <></>}
        <h1>IMAGES</h1>
        <div className="movie-images-div">
          {currentMovie && currentMovie.images.length ? (
            currentMovie.images.slice(10, 20).map((image) => {
              return <img src={Info.imagesUrl + image.file_path} alt="" />;
            })
          ) : (
            <></>
          )}
        </div>
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
async function SaveInLocalStorage(currentMovie) {
  const movies = await LocalStorage.getItem({ key: "fav-movies" });
  if (movies) {
    if (movies.filter((ele) => {
      return ele.id === currentMovie.id;
    }).length) {
      movies.push(currentMovie);
      await LocalStorage.setItem({ key: "fav-movies", value: movies });
    }
  } else {
    await LocalStorage.setItem({ key: "fav-movies", value: [currentMovie] });
  }
}

