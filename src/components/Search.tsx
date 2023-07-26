import React from "react";
import './styles/Search.css';

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search by employee name"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Search;
