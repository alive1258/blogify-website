import axios from 'axios'

// Create an instance of Axios with a base URL for making API requests.
export const api = axios.create({
  baseURL: 'http://localhost:3000', // Base URL of the API
})
