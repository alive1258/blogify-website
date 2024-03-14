import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import heartFilledIcon from '../../assets/icons/heart-filled.svg'
import heartIcon from '../../assets/icons/heart.svg'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'

const FavoriteAction = ({ blog }) => {
  const { auth } = useAuth()

  // Initialize favorite state based on blog's initial favorite status
  const [favorite, setFavorite] = useState(blog.isFavorite)
  const { api } = useAxios()

  useEffect(() => {
    // Update favorite state when the blog's favorite status changes
    setFavorite(blog.isFavorite)
  }, [blog.isFavorite])

  // Function to handle adding/removing the blog from favorites.
  const handleFavorite = async () => {
    try {
      if (!auth.user) {
        toast.error('To add a blog to your favorites, log in first', {
          position: toast.TOP_RIGHT,
        })
        return
      }

      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}/favourite`
      )

      if (response.status === 200) {
        // Toggle the favorite state
        setFavorite(!favorite)

        // Update localStorage (optional)
        localStorage.setItem(`favorite-${blog?.id}`, (!favorite).toString())

        // Show toast notification
        if (!favorite) {
          toast.success('Added to favorites', {
            position: toast.TOP_RIGHT,
          })
        } else {
          toast.error('Removed from favorites', {
            position: toast.TOP_RIGHT,
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button onClick={handleFavorite}>
      {auth?.user && favorite ? (
        <img src={heartFilledIcon} alt="Favorite" />
      ) : (
        <img src={heartIcon} alt="Favorite" />
      )}
    </button>
  )
}

export default FavoriteAction
