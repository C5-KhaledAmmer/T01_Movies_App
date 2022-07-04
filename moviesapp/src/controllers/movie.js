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
  }

  async getMovies() {}
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
      console.log(error);
      return this.movies;
    }
  }
}
