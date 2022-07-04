import { useEffect } from "react";
import "./App.css";
import { Movies } from "./controllers/movie";

const App = () => {
  useEffect(()=>{
    (async ()=>{
      const movies = new Movies();
     await movies.getMovies("upcoming");
      console.log(movies.movies);
    })()
  })
  return (
    <div className="App">
      <p>Hello From App</p>
    </div>
  );
};

export default App;
