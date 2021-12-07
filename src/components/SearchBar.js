import React from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  input: {
    width: '400px',
  },
  searchButton: {
    display: 'flex',
    padding: '4px 10px',
    background: '#fff',
    border: '1px solid #000',
    color: '#000',
    marginRight: '10px',
    marginLeft: '10px',
    alignItems: 'center',
  },
});

const SearchBar = ({ value, onChange, setShowIssues }) => {
  const classes = useStyles();
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px auto',
        width: '40%',
      }}
    >
      <div
        onClick={() => setShowIssues(false)}
        className={classes.searchButton}
      >
        HOME
      </div>
      <TextField
        className={classes.input}
        label="Search for users..."
        type="search"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div onClick={handleChange(value)} className={classes.searchButton}>
        Search
      </div>
    </div>
  );
};

export default SearchBar;
