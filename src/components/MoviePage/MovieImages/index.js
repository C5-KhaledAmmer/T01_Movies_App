import React from "react";
import { Info } from "../../../controllers/info";

export const MovieImages = ({ currentMovie }) => {
  return (
    <div>
      <h1 className="imagesSection">Movie Images</h1>
      <div className="movie-images-div">
        {currentMovie.images.slice(0,10).map((image) => {
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
