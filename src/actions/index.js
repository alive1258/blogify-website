// Actions related to profile data.

export const actions = {
  profile: {
    // Action types for fetching profile data.
    DATA_FETCHING: 'PROFILE_DATA_FETCHING',
    DATA_FETCHED: 'PROFILE_DATA_FETCHED',
    DATA_FETCH_ERROR: 'PROFILE_DATA_FETCH_ERROR',

    // Action type for editing user data.
    USER_DATA_EDITED: 'PROFILE_USER_DATA_EDITED',

    // Action type for updating user image.
    IMAGE_UPDATED: 'PROFILE_IMAGE_UPDATED',
  },

  // Actions related to post data.

  post: {
    // Action types for fetching post data.
    DATA_FETCHING: 'POST_DATA_FETCHING',
    DATA_FETCHED: 'POST_DATA_FETCHED',
    DATA_FETCH_ERROR: 'POST_DATA_FETCH_ERROR',

    // Action types for creating, editing, and deleting posts.
    DATA_CREATED: 'POST_DATA_CREATED',
    DATA_EDITED: 'POST_DATA_EDITED',
    POST_DELETED: 'POST_DATA_DELETED',
  },
}
