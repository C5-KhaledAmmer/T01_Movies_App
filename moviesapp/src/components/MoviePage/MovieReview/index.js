import React from "react";
import { Card } from "react-bootstrap";
import { Info } from "../../../controllers/info";
import "./style.css";

export const MovieReview = ({ currentMovie }) => {
  const variant = "dark";
  const buildReview = (review) => {
    const imgUrl = review.avatar_path.includes("http")
      ? `${review.avatar_path.slice(1)}`
      : `${Info.imagesUrl + review.avatar_path}`;
    return (
      <Card
        bg={variant.toLowerCase()}
        key={variant}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
        style={{ width: "100%" }}
        className="mb-2"
      >
        <div className="review-img-div">
          <img src={imgUrl} />
          <Card.Header>{review.author}</Card.Header>
        </div>

        <Card.Body>
          <div className="review-created-at">
            <Card.Title>{review.created_at}</Card.Title>
          </div>

          <Card.Text>{review.content}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="reviews-div">
      <h1 className="imagesSection">Movie Reviews</h1>
      {currentMovie.reviews.map((review) => {
        return buildReview(review);
      })}
    </div>
  );
};
{
  /* <div>
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
    </div> */
}
