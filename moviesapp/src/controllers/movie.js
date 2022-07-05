import axios from "axios";
import { Info } from "./info";
import{Video} from "../models/video"
import{Image} from "../models/Image"
import{Review} from "../models/review"

class Movie {
  constructor({
    id,
    poster_path,
    overview,
    genre_ids,
    release_date,
    vote_count,
    vote_average,
    title,
  }) {
    this.id = id;
    this.poster_path = poster_path;
    this.overview = overview;
    this.release_date = release_date;
    this.genre_ids = genre_ids;
    this.title = title;
    this.vote_count = vote_count;
    this.vote_average = vote_average;
    this.images = [];
    this.videos = [];
    this.reviews=[];
  }

  async getMovieImages() {
    try {
      const { data } = await axios.get(
        `${Info.hostUrl}/${this.id}}/images?api_key=${Info.ApiKey}`
      );
      data.backdrops.map((ele) => {
        const image = new Image ({...ele})
        this.images.push(image);
      });
      return this.images;
    } catch (error) {
      return this.images;
    }
  }

  async getMovieVideos() {
    try {
      const { data } = await axios.get(
        `${Info.hostUrl}/${this.id}/videos?api_key=${Info.ApiKey}`
      );
      data.results.map((ele) => {
        const video = new Video ({...ele})
        this.videos.push(video);
      });
      return this.videos;
    } catch (error) {
      return this.videos;
    }
  }

  async getMovieReviews() {
    try {
      const { data } = await axios.get(
        `${Info.hostUrl}/${this.id}/reviews?api_key=${Info.ApiKey}`
      );
      data.results.map((ele) => {
        const review = new Review ({...ele})
        this.reviews.push(review);
      });
      return this.reviews;
    } catch (error) {
      return this.reviews;
    }
  }
  

}

export class Movies {
  constructor() {
    this.movies = [];
  }

  async getMovies(category) {
    try {
      const { data } = await axios.get(
        `${Info.hostUrl}/${category}?api_key=${Info.ApiKey}&language=en-US&page=1`
      );

      data.results.map((ele) => {
        const movie = new Movie({ ...ele });
        this.movies.push(movie);
      });

      return this.movies;
    } catch (error) {
      return this.movies;
    }
  }
}
