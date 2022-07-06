import { useEffect,createContext ,useState,useContext} from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Genre } from "./models/genre";
import { MoviePage } from "./components/MoviePage";

export const movieContext = createContext();

const App = () => {
  useEffect(() => {
    (async () => {
      await Genre.getGenres();
    })();
  });
  const [currentMovie, setCurrentMovie] = useState(null)
  return (
    <div className="App">
      <movieContext.Provider value={{setCurrentMovie,currentMovie}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id/:movieName" element={<MoviePage />} />
        </Routes>
      </movieContext.Provider>
      
    </div>
  );
};

export default App;
