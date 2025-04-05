import { useState, useEffect } from 'react';
import { fetchBreweries } from '../utils/api';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import DataList from '../components/DataList';
import StatisticCard from '../components/StatisticCard';
import './Dashboard.css';

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('type');
  const [filterValue, setFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Statistics
  const [totalBreweries, setTotalBreweries] = useState(0);
  const [breweryTypes, setBreweryTypes] = useState({});
  const [statesCount, setStatesCount] = useState(0);
  
  // Fetch breweries data
  useEffect(() => {
    const getBreweries = async () => {
      try {
        setLoading(true);
        const data = await fetchBreweries();
        setBreweries(data);
        setFilteredBreweries(data);
        setLoading(false);
        
        // Calculate statistics
        setTotalBreweries(data.length);
        
        // Count brewery types
        const types = {};
        data.forEach(brewery => {
          if (brewery.brewery_type) {
            types[brewery.brewery_type] = (types[brewery.brewery_type] || 0) + 1;
          }
        });
        setBreweryTypes(types);
        
        // Count unique states
        const uniqueStates = new Set(data.map(brewery => brewery.state)).size;
        setStatesCount(uniqueStates);
        
      } catch (err) {
        setError('Failed to fetch brewery data. Please try again later.');
        setLoading(false);
      }
    };
    
    getBreweries();
  }, []);
  
  // Filter breweries based on search term and filter
  useEffect(() => {
    let results = breweries;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(brewery => 
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filterValue) {
      switch (filterType) {
        case 'type':
          results = results.filter(brewery => 
            brewery.brewery_type === filterValue
          );
          break;
        case 'state':
          results = results.filter(brewery => 
            brewery.state && brewery.state.toLowerCase().includes(filterValue.toLowerCase())
          );
          break;
        case 'city':
          results = results.filter(brewery => 
            brewery.city && brewery.city.toLowerCase().includes(filterValue.toLowerCase())
          );
          break;
        default:
          break;
      }
    }
    
    setFilteredBreweries(results);
  }, [breweries, searchTerm, filterType, filterValue]);
  
  // Find most common brewery type
  const getMostCommonType = () => {
    if (Object.keys(breweryTypes).length === 0) return 'N/A';
    
    let maxType = '';
    let maxCount = 0;
    
    Object.entries(breweryTypes).forEach(([type, count]) => {
      if (count > maxCount) {
        maxType = type;
        maxCount = count;
      }
    });
    
    return maxType;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Brewery Explorer</h2>
        <p>Discover breweries across the United States</p>
      </div>
      
      <div className="statistics">
        <StatisticCard
          title="Total Breweries"
          value={totalBreweries}
        />
        <StatisticCard
          title="Most Common Type"
          value={getMostCommonType()}
        />
        <StatisticCard
          title="States Represented"
          value={statesCount}
        />
      </div>
      
      <div className="filters-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterBar 
          filterType={filterType} 
          setFilterType={setFilterType}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      
      {loading ? (
        <div className="loading">Loading breweries...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="results-summary">
            <p>Showing {filteredBreweries.length} of {totalBreweries} breweries</p>
          </div>
          <DataList breweries={filteredBreweries} />
        </>
      )}
    </div>
  );
}

export default Dashboard;