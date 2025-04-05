import axios from 'axios';

const BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

export const fetchBreweries = async () => {
  try {
    // Fetch 50 breweries to ensure we have enough data
    const response = await axios.get(`${BASE_URL}?per_page=50`);
    return response.data;
  } catch (error) {
    console.error('Error fetching breweries:', error);
    throw error;
  }
};

export const fetchBreweryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching brewery with id ${id}:`, error);
    throw error;
  }
};