export class Info {
    static hostUrl = "https://api.themoviedb.org/3/movie";
    static ApiKey= "1bfa430aada4409bfa6a3c5528128e8a";
    static imagesUrl= "https://image.tmdb.org/t/p/original//"
  }
  

export class LocalStorage {
  static async getItem({ key }) {
    return JSON.parse(window.localStorage.getItem(`${key}`));
  }
  static async setItem({ key, value }) {
    return window.localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  static async removeItem({ key }) {
    return window.localStorage.removeItem(`${key}`);
  }
}
