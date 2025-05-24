import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<div className="grid">
			{props.movies.map((movie, index) => (
				<div key={movie.imdbID || index} className="image-container">
					<img 
						src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'} 
						alt={movie.Title}
					/>
					<div className="overlay">
						<div className="movie-info">
							<h3>{movie.Title}</h3>
							<p>{movie.Year}</p>
							<button 
								onClick={() => props.handleFavouritesClick(movie)}
								className="action-btn"
							>
								<FavouriteComponent />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;
