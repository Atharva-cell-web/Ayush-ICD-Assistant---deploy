import { useState, useRef } from 'react';

import axios from 'axios';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [hasPinged, setHasPinged] = useState(false);
  const debounceRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);


  // Connects to your backend to find diseases
  const handleSearch = (e) => {
  const val = e.target.value;
  setQuery(val);
  setError(null);

  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  if (val.length <= 1) {
    setSuggestions([]);
    return;
  }

  debounceRef.current = setTimeout(async () => {
    try {
      if (!hasPinged) {
        setIsWakingUp(true);
      }

      setIsSearching(true);

      const res = await axios.get(
        `https://ayush-backend-0h8n.onrender.com/api/search?q=${val}`
      );

      setSuggestions(res.data);
      setHasPinged(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSearching(false);
      setIsWakingUp(false);
    }
  }, 300); // debounce delay
};



  // Handles clicking a dropdown item
  const handleSelect = (disease) => {
    setSelectedData(disease);
    setSuggestions([]);
    setQuery(''); // Clears search bar for a cleaner look
  };

  return (
    <div className="app-container">
      <Navbar />

      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        suggestions={suggestions}
        handleSelect={handleSelect}
      />
            {isSearching && (
        <div className="empty-state" style={{ marginTop: "1rem" }}>
          <p>Searching…</p>
        </div>
      )}

      {!isSearching && query.length > 1 && suggestions.length === 0 && !error && (
        <div className="empty-state" style={{ marginTop: "1rem" }}>
          <p>No matching condition found</p>
        </div>
      )}

      {error && (
        <div className="empty-state" style={{ marginTop: "1rem", color: "red" }}>
          <p>{error}</p>
        </div>
      )}

      {isWakingUp && (
        <div className="empty-state" style={{ marginTop: "1rem" }}>
          <p>Starting backend service… first request may take a moment.</p>
        </div>
      )}


      {/* Show the Result Card if data is selected, otherwise show welcome message */}
      {selectedData ? (
        <ResultCard
          data={selectedData}
          onSave={() => alert('✅ Patient Record Updated with Dual Codes')}
        />
      ) : (
        <div className="empty-state">
          <p>Start typing to map Traditional Medicine to Modern Standards</p>
        </div>
      )}
    </div>
  );
}

export default App;