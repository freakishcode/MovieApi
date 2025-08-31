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
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 3 }}
    >
      <TextField
        fullWidth
        label='Search movies...'
        value={term}
        style={{ borderRadius: 3 }}
        onChange={(e) => setTerm(e.target.value)}
      />
      <IconButton type='submit' color='primary'>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
