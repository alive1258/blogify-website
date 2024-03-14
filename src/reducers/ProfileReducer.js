import { actions } from '../actions'

// Define the initial state for the profile reducer
const initialState = {
  user: null, // Object to store user data
  blogs: [], // Array to store user's blogs
  loading: false, // Flag to indicate if data is being fetched or modified
  error: null, // Error message if data fetching or modification fails
}

// Define the profile reducer function to handle actions related to user profile
const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      // Update state to indicate data fetching
      return {
        ...state,
        loading: true,
      }
    }

    case actions.profile.DATA_FETCHED: {
      // Update state with fetched user data and reset loading flag
      return {
        ...state,
        loading: false,
        user: action.data,
        blogs: action.data.blogs,
      }
    }

    case actions.profile.DATA_FETCH_ERROR: {
      // Update state with error message and reset loading flag
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case actions.profile.USER_DATA_EDITED: {
      // Update state with edited user data and reset loading flag
      return {
        ...state,
        loading: false,
        user: action.data,
      }
    }

    case actions.profile.IMAGE_UPDATED: {
      // Update user avatar in state with the new image URL and reset loading flag
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      }
    }

    default: {
      // If action type doesn't match, return current state
      return state
    }
  }
}

// Export the initial state and profile reducer function
export { initialState, profileReducer }
