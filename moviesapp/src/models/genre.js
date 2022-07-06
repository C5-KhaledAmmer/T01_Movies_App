import { Info } from "../controllers/info";
import axios from "axios";
export class Genre {
  static genres=[];

  static async  getGenres(language="en-US") {
    this.genres=[];
    try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${Info.ApiKey}&language=${language}`
        );
        data.genres.map((ele) => {
          this.genres.push(ele);
        });
        return  this.genres;
      } catch (error) {
        return [];
      }
  }
}
