import { createContext } from 'react'

const AuthContext = createContext()
const ProfileContext = createContext()
const PostContext = createContext()
const PopularContext = createContext()
const LikeContext = createContext()

// Export the created contexts
export { AuthContext, LikeContext, PopularContext, PostContext, ProfileContext }
