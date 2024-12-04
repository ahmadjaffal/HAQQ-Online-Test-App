import React from 'react';

const SearchBox = ({ searchTerm, handleSearch }) => {
    
    // Handle the change on the search input
    const handleChange = (event) => {
        handleSearch(event.target.value);
    };

    // Clear the search input
    const clearSearch = () => {
        handleSearch('');
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleChange}
            />
            {searchTerm !== '' ? <span onClick={clearSearch} title="Clear Search">
                X
            </span>
                : null
            }
        </div>
    );
};

export default SearchBox;