import {useState,useEffect} from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com?apikey=6cc321d8";

const movie1 = {
    "Title": "Spiderman",
    "Year": "2010",
    "imdbID": "tt1785572",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () =>{

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('spiderman');
    },[]);

    return(
        <div className='app'>
            <h1>CharlyFlix</h1>
            <div className='search'>
                <input
                    placeholder='recherche film'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>Aucun film trouvé</h2>
                    </div>
                )}
        </div>
    );
}

export default App;