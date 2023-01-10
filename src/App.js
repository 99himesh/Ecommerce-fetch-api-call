import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies ,setmovies]=useState([]);
  const [ isLoading,setLoading]=useState(false);

  const  fetchMovieHAndler = async()=>{
    setLoading(true);
    const response=await fetch('https://swapi.dev/api/films',);
    const data= await response.json();
      const transformedData=data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setmovies(transformedData);
      setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHAndler}  >Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>No data found</p>}
        {isLoading &&  <p>...Ladding</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
