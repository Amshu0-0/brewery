import './About.css';

function About() {
  return (
    <div className="about">
      <h2>About Brewery Explorer</h2>
      <p>
        Brewery Explorer is a data dashboard application that provides information about
        breweries across the United States. The application uses the Open Brewery DB API
        to fetch and display brewery data.
      </p>
      
      <div className="about-section">
        <h3>Features</h3>
        <ul>
          <li>View a list of breweries with key information</li>
          <li>Search for breweries by name</li>
          <li>Filter breweries by type, state, or city</li>
          <li>View detailed information about specific breweries</li>
          <li>See summary statistics about the dataset</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h3>Technologies Used</h3>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
          <li>Axios</li>
          <li>Open Brewery DB API</li>
        </ul>
      </div>
      
      <div className="about-section">
        <h3>About the API</h3>
        <p>
          Open Brewery DB is a free dataset and API with public information on breweries,
          cideries, brewpubs, and bottleshops. Learn more at{' '}
          <a href="https://www.openbrewerydb.org/" target="_blank" rel="noopener noreferrer">
            openbrewerydb.org
          </a>.
        </p>
      </div>
    </div>
  );
}

export default About;