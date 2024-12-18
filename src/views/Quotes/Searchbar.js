import React from 'react';
import { Container, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bgcolor } from '@mui/system';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <Container sx={{ bgcolor: 'white', height: 38 }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="standard"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />
          }}
          sx={{
            width: 200,
            height: 30,
            '& .MuiInput-underline:before': {
              borderBottom: '0.1px  solid  gray'
            },

            '& .MuiInput-underline:hover:before': {
              borderBottom: '2px solid black'
            },
            '& .MuiInput-underline:after': {
              borderBottom: '2px solid black'
            }
          }}
        />
      </Container>
    </>
  );
};

export default SearchBar;
