import './FilterBar.css';

function FilterBar({ filterType, setFilterType, filterValue, setFilterValue }) {
  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(''); // Reset filter value when changing type
  };

  return (
    <div className="filter-bar">
      <div className="filter-type">
        <label htmlFor="filter-type">Filter by:</label>
        <select 
          id="filter-type" 
          value={filterType} 
          onChange={handleFilterTypeChange}
        >
          <option value="type">Brewery Type</option>
          <option value="state">State</option>
          <option value="city">City</option>
        </select>
      </div>
      
      {filterType === 'type' && (
        <div className="filter-value">
          <label htmlFor="filter-value">Brewery Type:</label>
          <select 
            id="filter-value" 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="micro">Micro</option>
            <option value="nano">Nano</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
            <option value="large">Large</option>
            <option value="planning">Planning</option>
            <option value="bar">Bar</option>
            <option value="contract">Contract</option>
            <option value="proprietor">Proprietor</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      )}
      
      {filterType === 'state' && (
        <div className="filter-value">
          <label htmlFor="filter-value">State:</label>
          <input 
            type="text" 
            id="filter-value" 
            placeholder="Enter state..." 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      )}
      
      {filterType === 'city' && (
        <div className="filter-value">
          <label htmlFor="filter-value">City:</label>
          <input 
            type="text" 
            id="filter-value" 
            placeholder="Enter city..." 
            value={filterValue} 
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default FilterBar;