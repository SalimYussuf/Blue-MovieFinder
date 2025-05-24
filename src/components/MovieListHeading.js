import React from 'react';

const MovieListHeading = (props) => {
	const isLogo = props.heading === 'MovieFinder';
	
	return (
		<div className={`col ${isLogo ? 'logo-container' : 'section-title-container'}`}>
			<h1 className={isLogo ? 'logo' : 'section-title'}>
				{props.heading}
			</h1>
		</div>
	);
};

export default MovieListHeading;
