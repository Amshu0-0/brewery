import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBreweryById } from '../utils/api';
import './Detail.css';

function Detail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getBrewery = async () => {
      try {
        setLoading(true);
        const data = await fetchBreweryById(id);
        setBrewery(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch brewery details. Please try again later.');
        setLoading(false);
      }
    };
    
    getBrewery();
  }, [id]);
  
  if (loading) return <div className="loading">Loading brewery details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!brewery) return <div className="not-found">Brewery not found</div>;
  
  return (
    <div className="brewery-detail">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      <div className="brewery-header">
        <h2>{brewery.name}</h2>
        <span className="brewery-type">{brewery.brewery_type}</span>
      </div>
      
      <div className="brewery-info-card">
        <div className="info-section">
          <h3>Contact Information</h3>
          <ul>
            {brewery.phone && (
              <li>
                <strong>Phone:</strong> {brewery.phone}
              </li>
            )}
            {brewery.website_url && (
              <li>
                <strong>Website:</strong>{' '}
                <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                  {brewery.website_url}
                </a>
              </li>
            )}
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Location</h3>
          <address>
            {brewery.street && <p>{brewery.street}</p>}
            <p>
              {brewery.city}, {brewery.state} {brewery.postal_code}
            </p>
            {brewery.country && <p>{brewery.country}</p>}
          </address>
          
          {(brewery.latitude && brewery.longitude) && (
            <div className="map-link">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;