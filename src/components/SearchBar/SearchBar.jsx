import "./SearchBar.css";

import { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <Box component='form' onSubmit={handleSubmit} className='searchbar-form'>
      <TextField
        fullWidth
        label='Search movies...'
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className='searchbar-input'
      />
      <IconButton type='submit' color='primary' className='searchbar-btn'>
        <SearchIcon className='iconSearch' />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
