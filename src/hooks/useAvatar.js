import { useProfile } from './useProfile'

export const useAvatar = blog => {
  const { state } = useProfile()

  // Checking if the current user is the author of the blog
  const isMe = blog?.author?.id === state?.user?.id

  // Determining the avatar URL based on whether the current user is the author or not
  const avatar = isMe ? `${state?.user?.avatar}` : `${blog?.author?.avatar}`

  // Constructing the full avatar URL using environment variables
  const avatarURL = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/uploads/avatar/${avatar}`

  return { avatarURL }
}
