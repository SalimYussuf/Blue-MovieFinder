import React from 'react';

const SearchBox = (props) => {
	return (
		<div className="search-container">
			<input
				type="text"
				value={props.searchValue}
				onChange={(e) => props.setSearchValue(e.target.value)}
				placeholder="Search for movies..."
				className="search-input"
			/>
			<svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<circle cx="11" cy="11" r="8"/>
				<path d="m21 21-4.35-4.35"/>
			</svg>
		</div>
	);
};

export default SearchBox;
