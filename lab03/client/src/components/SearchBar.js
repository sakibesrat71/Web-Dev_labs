import React, { useState } from 'react';
import axios from 'axios';

function SearchBar(props) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const styles = {
    container: {
      position: 'relative',
    },
    input: {
      padding: '5px',
      borderRadius: '5px',
      border: 'none',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
      width: '200px',
    },
    resultsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 1,
      backgroundColor: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
      maxHeight: '200px',
      overflowY: 'auto',
      width: '100%',
    },
    resultItem: {
      padding: '5px',
      cursor: 'pointer',
    },
  };

  function handleInputChange(event) {
    setSearchText(event.target.value);
    
        axios
            .get(`http://localhost:7000/search/${event.target.value}`)
            .then((response) => {
            setSearchResults(response.data);
            })
            .catch((err) => {
            console.log(err);
            });
  }

  function handleSelectResult(result) {
    props.onSelect(result);
    setSearchText('');
    setSearchResults([]);
  }

  return (
    <div style={styles.container}>
      <input style={styles.input} type="text" value={searchText} onChange={handleInputChange} />
      {searchResults.length > 0 && (
        <div style={styles.resultsContainer}>
          {searchResults.map((result) => (
            <div key={result.id} style={styles.resultItem} >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
