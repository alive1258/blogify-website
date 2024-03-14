import { actions } from '../actions'

// Define the initial state for the popular reducer
const initialState = {
  blogs: [], // Array to store fetched popular blogs
  loading: false, // Flag to indicate if data is being fetched
  error: null, // Error message if data fetching fails
}

// Define the popular reducer function to handle actions related to fetching popular blogs
const popularReducer = (state, action) => {
  switch (action.type) {
    case actions.popular.DATA_FETCHING: {
      // Update state to indicate data fetching
      return {
        ...state,
        loading: true,
      }
    }

    case actions.popular.DATA_FETCHED: {
      // Update state with fetched blogs and reset loading flag
      return {
        ...state,
        blogs: action.data.blogs,
        loading: false,
      }
    }

    case actions.popular.DATA_FETCH_ERROR: {
      // Update state with error message and reset loading flag
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    default: {
      // If action type doesn't match, return current state
      return state
    }
  }
}

export { initialState, popularReducer }
