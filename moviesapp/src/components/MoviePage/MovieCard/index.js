import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Info, LocalStorage } from "../../../controllers/info";
import "./style.css";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const [showModel, setShowModel] = useState(false);
  const btns = [
    {
      text: "Add To Favorite",
      onClick: () => {
        setShowModel(true);
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
    <div className="main-movie-page-card">
      <div className="movie-page-card">
        {showModel ? (
          buildModel({
            title: "Add To Favorite",
            body: "This movie will added into favorite list, are you sure?",
            fCancel: () => {
              setShowModel(false);
            },
            fAccept: async () => {
              SaveInLocalStorage(movie);
              setShowModel(false);
            },
          })
        ) : (
          <></>
        )}
        {movie.poster_path ? (
          <img src={`${Info.imagesUrl + movie.poster_path}`} />
        ) : (
          <></>
        )}

        <div className="content-div-movie-page">
          <div>
            <h1 className="movie-page-title">{movie.title}</h1>
            <p className="movie-page-overview">{movie.overview}</p>
            {movie.release_date ? (
              <div className="release-votes">
                <h4>
                  <span className="span-card-subtitle">{"Genres:  "}</span>
                  {movie.genre_ids.length ? (
                    movie.genre_ids.map((genre, index) => {
                      return (
                        <small className="card-subtitle" key={genre + movie.id}>
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
                </h4>
                <h4 className="card-subtitle">
                  <span className="span-card-subtitle">{"Release Date: "}</span>
                  {movie.release_date}
                </h4>
              </div>
            ) : (
              <></>
            )}
            <div className="release-votes1">
              {movie ? (
                <h6>
                  <span className="span-card-subtitle">{"Status: "}</span>
                  {movie.status ? movie.status : "Released"}
                </h6>
              ) : (
                <></>
              )}

              {movie && movie.vote_count ? (
                <h6>
                  <span className="span-card-subtitle">{"Vote Count: "}</span>
                  {movie.vote_count}
                </h6>
              ) : (
                <></>
              )}
              {movie && movie.vote_average ? (
                <h6>
                  <span className="span-card-subtitle">{"Vote Avg: "}</span>
                  {movie.vote_average}
                </h6>
              ) : (
                <></>
              )}
            </div>
            <div className="release-votes">
              {movie && movie.budget ? (
                <h6>
                  <span className="span-card-subtitle">{"Budget: "}</span>
                  {movie.budget + " $"}
                </h6>
              ) : (
                <></>
              )}

              {movie && movie.revenue ? (
                <h6>
                  <span className="span-card-subtitle">{"Revenue: "}</span>
                  {movie.revenue + " $"}
                </h6>
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
      </div>
    </div>
  );
};
async function SaveInLocalStorage(movie) {
  const movies = await LocalStorage.getItem({ key: "fav-movies" });

  if (movies) {
    if (
      !movies.filter((ele) => {
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
export const buildModel = ({ title, body, fCancel, fAccept }) => {
  return (
    <div id="alert">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={title.includes("A") ? fCancel : fAccept}
            variant="danger"
          >
            {title.includes("A") ? "Close" : "Remove"}
          </Button>
          <Button
            onClick={!title.includes("A") ? fCancel : fAccept}
            variant="success"
          >
            {title.includes("A") ? "Add" : "Close"}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
