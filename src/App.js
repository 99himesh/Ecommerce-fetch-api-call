import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies ,setmovies]=useState([]);
  const fetchMovieHAndler =()=>{
    fetch('https://swapi.dev/api/films',).then((response)=>{
      return response.json();
    }).then((data)=>{
      const transformedData=data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setmovies(transformedData);
    })
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHAndler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;