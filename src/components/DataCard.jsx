import { Link } from 'react-router-dom';
import './DataCard.css';

function DataCard({ brewery }) {
  return (
    <div className="data-card">
      <div className="brewery-info">
        <h3>{brewery.name}</h3>
        <div className="brewery-details">
          <div className="detail">
            <span className="label">Type:</span>
            <span className="value">{brewery.brewery_type}</span>
          </div>
          <div className="detail">
            <span className="label">City:</span>
            <span className="value">{brewery.city}</span>
          </div>
          <div className="detail">
            <span className="label">State:</span>
            <span className="value">{brewery.state}</span>
          </div>
        </div>
      </div>
      <div className="brewery-actions">
        {brewery.website_url && (
          <a 
            href={brewery.website_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="website-link"
          >
            Visit Website
          </a>
        )}
        <Link to={`/detail/${brewery.id}`} className="detail-link">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default DataCard;