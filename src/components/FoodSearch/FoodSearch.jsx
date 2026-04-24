import React, { useState, useEffect } from 'react';
import { searchFoods, getFoodsByCategory } from '../../services/foodSearch';
import FoodCard from './FoodCard';
import { foodCategories } from '../../data/foodDatabase';

const FoodSearch = ({ onSelectFood }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (query.trim() === '') {
      setResults(getFoodsByCategory(activeCategory));
    } else {
      setResults(searchFoods(query));
      setActiveCategory('All');
    }
  }, [query, activeCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <input 
        type="text" 
        className="glass-input" 
        placeholder="Search for foods (e.g. Chicken, Apple, Rice...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
      />

      {query === '' && (
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button 
            className={`chip ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>
          {foodCategories.map(cat => (
            <button 
              key={cat}
              className={`chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        alignContent: 'start',
        paddingRight: '8px'
      }}>
        {results.length > 0 ? (
          results.map((food, i) => (
            <div key={food.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <FoodCard food={food} onClick={onSelectFood} />
            </div>
          ))
        ) : (
          <div className="text-muted" style={{ padding: '20px', textAlign: 'center', gridColumn: '1 / -1' }}>
            No foods found matching "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
