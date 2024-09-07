// Taginfo API wrapper

const TAGINFO_BASE_URL = 'https://taginfo.openstreetmap.org/api/4';

/**
 * Fetches data from the Taginfo API
 * @param {string} endpoint - The API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - The API response
 */
async function fetchTaginfoAPI(endpoint, params) {
  const url = new URL(`${TAGINFO_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from Taginfo API:', error);
    throw error;
  }
}

/**
 * Gets the total number of uses for a key
 * @param {string} key - The OSM key
 * @returns {Promise<number>} - Total number of uses
 */
async function getKeyUsage(key) {
  const data = await fetchTaginfoAPI('/key/stats', { key });
  return data.data.find(item => item.type === 'all')?.count || 0;
}

/**
 * Gets the number of uses for a specific key-value pair
 * @param {string} key - The OSM key
 * @param {string} value - The OSM value
 * @returns {Promise<number>} - Number of uses for the key-value pair
 */
async function getTagUsage(key, value) {
  const data = await fetchTaginfoAPI('/tag/stats', { key, value });
  return data.data.find(item => item.type === 'all')?.count || 0;
}

// Export the functions for use in other modules
export { getKeyUsage, getTagUsage };