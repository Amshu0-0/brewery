import DataCard from './DataCard';
import './DataList.css';

function DataList({ breweries }) {
  return (
    <div className="data-list">
      {breweries.length > 0 ? (
        breweries.map((brewery) => (
          <DataCard key={brewery.id} brewery={brewery} />
        ))
      ) : (
        <div className="no-results">
          <p>No breweries found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default DataList;