import { useState, useEffect } from 'react';
import { fetchBreweries } from '../utils/api';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import DataList from '../components/DataList';
import StatisticCard from '../components/StatisticCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
  
  // Chart data
  const [typeChartData, setTypeChartData] = useState([]);
  const [stateChartData, setStateChartData] = useState([]);
  const [showCharts, setShowCharts] = useState(true);
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];
  
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
        const states = {};
        data.forEach(brewery => {
          if (brewery.state) {
            states[brewery.state] = (states[brewery.state] || 0) + 1;
          }
        });
        setStatesCount(Object.keys(states).length);
        
        // Prepare chart data
        const typeData = Object.entries(types).map(([name, value]) => ({
          name,
          value
        }));
        setTypeChartData(typeData);
        
        // Get top 10 states by brewery count
        const stateData = Object.entries(states)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([name, value]) => ({
            name,
            value
          }));
        setStateChartData(stateData);
        
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
  
  // Toggle charts visibility
  const toggleCharts = () => {
    setShowCharts(!showCharts);
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
      
      <div className="chart-toggle">
        <button onClick={toggleCharts}>
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>
      
      {showCharts && (
        <div className="charts-container">
          <div className="chart-card">
            <h3>Breweries by Type</h3>
            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={typeChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Number of Breweries" fill={COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Top 10 States by Brewery Count</h3>
            <div className="chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stateChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stateChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [value, 'Breweries']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
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