import axios from "axios";
import { Info } from "./info";
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
  }

  async getMovieImages() {
    try {
      const { data } = await axios.get(
        `${Info.hostUrl}/${22}/images?api_key=${Info.ApiKey}`
      );
      data.backdrops.map((ele) => {
        this.images.push(ele.file_path);
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
        this.videos.push(ele);
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
      data.backdrops.map((ele) => {
        this.images.push(ele.file_path);
      });
      return this.images;
    } catch (error) {
      return this.images;
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
