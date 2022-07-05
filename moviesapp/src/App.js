import { useEffect } from "react";
import "./App.css";
import { Movies } from "./controllers/movie";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Genre } from "./models/genre";

const App = () => {
  useEffect(() => {
    (async () => {
      await Genre.getGenres();
    })();
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
