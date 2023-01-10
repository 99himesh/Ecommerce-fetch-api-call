import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setErrror] = useState(null);

  const fetchMovieHAndler = useCallback(async () => {
    setLoading(true);
    setErrror(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        // setInterval(()=>{
        throw new Error("Something went wrong ...Retrying");
        // },5000)
      }

      const data = await response.json();

      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setmovies(transformedData);
    } catch (error) {
      setErrror(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHAndler();
    console.log('fu');
  }, [fetchMovieHAndler]);

  let content = <p>No data found</p>;

  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>...Loading</p>;
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHAndler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length>0 && }
        {!isLoading && movies.length===0 && !error && <p>No data found</p>}
        {isLoading &&  <p>...Ladding</p>}
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
