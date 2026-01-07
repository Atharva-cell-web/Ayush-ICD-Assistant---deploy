import { useState } from 'react';
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

  // Connects to your backend to find diseases
  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 1) {
      try {
        if (!hasPinged) {
          setIsWakingUp(true);
        }

        const res = await axios.get(
          `https://ayush-backend-0h8n.onrender.com/api/search?q=${val}`
        );

        setSuggestions(res.data);
        setHasPinged(true);
      } catch (err) {
        console.error("API Error", err);
      } finally {
        setIsWakingUp(false);
      }
    } else {
      setSuggestions([]);
    }
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