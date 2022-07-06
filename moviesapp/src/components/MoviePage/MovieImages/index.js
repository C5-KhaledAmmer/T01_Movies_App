import React from "react";
import { Info } from "../../../controllers/info";

export const MovieImages = ({ currentMovie }) => {
  return (
    <div>
      <h1>IMAGES</h1>
      <div className="movie-images-div">
        {currentMovie.images.slice(10, 20).map((image) => {
          return (
            <img
              key={image.file_path}
              src={Info.imagesUrl + image.file_path}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};
