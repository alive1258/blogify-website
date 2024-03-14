import { actions } from '../actions'

// Define the initial state for the post reducer
const initialState = {
  blogs: [], // Array to store fetched blogs
  loading: false, // Flag to indicate if data is being fetched or modified
  error: null, // Error message if data fetching or modification fails
}

// Define the post reducer function to handle actions related to blog posts
const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      // Update state to indicate data fetching
      return {
        ...state,
        loading: true,
      }
    }

    case actions.post.DATA_FETCHED: {
      // Update state with fetched blogs and reset loading flag
      return {
        ...state,
        blogs: action.data.blogs,
        loading: false,
      }
    }

    case actions.post.DATA_FETCH_ERROR: {
      // Update state with error message and reset loading flag
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case actions.post.DATA_CREATED: {
      // Update state with new blog post and reset loading flag
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      }
    }

    case actions.post.POST_DELETED: {
      // Update state by removing the deleted post and reset loading flag
      return {
        ...state,
        loading: false,
        blogs: state.blogs.filter(item => item.id !== action.data),
      }
    }

    case actions.post.DATA_EDITED: {
      // Update state with edited blog post and reset loading flag
      return {
        ...state,
        loading: false,
        user: action.data,
      }
    }

    default: {
      // If action type doesn't match, return current state
      return state
    }
  }
}

// Export the initial state and post reducer function
export { initialState, postReducer }
