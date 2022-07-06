import React from 'react'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Info, LocalStorage } from '../../../controllers/info';
import "./style.css"
export const MovieCard = ({movie}) => {
    const navigate = useNavigate()
    const btns = [
        {
          text: "Add To Favorite",
          onClick: async () => {
            await SaveInLocalStorage(movie);
          },
        },
        {
          text: "Home Page ",
          onClick: () => {
            navigate("/");
          },
        },
      ];
  return (
    <div className="movie-page-card">
    {movie.poster_path ? (
      <img src={`${Info.imagesUrl + movie.poster_path}`} />
    ) : (
      <></>
    )}
    <Card.Body>
      <div className="content-div-movie-page">
        <div>
          <h1 className="movie-page-title">{movie.title}</h1>
          <p className="movie-page-overview">{movie.overview}</p>
          {movie.vote_count >= 0 ? (
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
                  return (
                    <small key={genre + movie.id}>{genre + ", "}</small>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {movie ? (
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
        </div>
        <div>
          {btns.map((ele) => {
            return (
              <button
                key={ele.text}
                className="btns-card"
                onClick={ele.onClick}
              >
                {ele.text}
              </button>
            );
          })}
        </div>
      </div>
    </Card.Body>
  </div>
  )
}
async function SaveInLocalStorage(movie) {
    const movies = await LocalStorage.getItem({ key: "fav-movies" });
    if (movies) {
      if (
        movies.filter((ele) => {
          return ele.id === movie.id;
        }).length
      ) {
        movies.push(movie);
        await LocalStorage.setItem({ key: "fav-movies", value: movies });
      }
    } else {
      await LocalStorage.setItem({ key: "fav-movies", value: [movie] });
    }
  }