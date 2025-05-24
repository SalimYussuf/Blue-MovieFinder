import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);

	const getMovieRequest = async (searchValue) => {
		if (!searchValue.trim()) return;
		
		setLoading(true);
		try {
			const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=8dc1b028`;
			const response = await fetch(url);
			const responseJson = await response.json();

			if (responseJson.Search) {
				setMovies(responseJson.Search);
			} else {
				setMovies([]);
			}
		} catch (error) {
			console.error('Error fetching movies:', error);
			setMovies([]);
		}
		setLoading(false);
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getMovieRequest(searchValue);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const isAlreadyFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
		if (!isAlreadyFavourite) {
			const newFavouriteList = [...favourites, movie];
			setFavourites(newFavouriteList);
			saveToLocalStorage(newFavouriteList);
		}
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className="app">
			<header className="header">
				<div className="container">
					<div className="header-content">
						<MovieListHeading heading="MovieFinder" />
						<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					</div>
				</div>
			</header>

			<main className="main">
				<div className="container">
					<section className="section">
						<MovieListHeading heading="Discover Movies" />
						{loading ? (
							<div className="loading">Searching for movies...</div>
						) : movies.length > 0 ? (
							<MovieList
								movies={movies}
								handleFavouritesClick={addFavouriteMovie}
								favouriteComponent={AddFavourites}
							/>
						) : searchValue ? (
							<div className="empty-state">
								<h3>No movies found</h3>
								<p>Try searching for something else</p>
							</div>
						) : null}
					</section>

					{favourites.length > 0 && (
						<section className="section">
							<MovieListHeading heading="Your Favourites" />
							<MovieList
								movies={favourites}
								handleFavouritesClick={removeFavouriteMovie}
								favouriteComponent={RemoveFavourites}
							/>
						</section>
					)}

					{favourites.length === 0 && (
						<section className="section">
							<div className="empty-state">
								<h3>No favourites yet</h3>
								<p>Start adding movies you love to see them here</p>
							</div>
						</section>
					)}
				</div>
			</main>

			<footer className="footer">
				<div className="footer-content">
					<h3>Created with ♥ by Salim</h3>
					<p>Discover and collect your favorite movies</p>
				</div>
			</footer>
		</div>
	);
};

export default App;
