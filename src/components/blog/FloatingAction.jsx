import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import FavoriteAction from './FavoriteAction'

import commentIcon from '../../assets/icons/comment.svg'
import LikeFilledIcon from '../../assets/icons/like-filled.svg'
import likeIcon from '../../assets/icons/like.svg'

const FloatingAction = ({ blog, onLikeAdded }) => {
  const { auth } = useAuth()
  const { api } = useAxios()

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0)

  useEffect(() => {
    const likedStatus = localStorage.getItem(`isLiked-${blog?.id}`)
    if (likedStatus === 'true') {
      setIsLiked(true)
    }
  }, [blog])

  // Function to handle like action.
  const handleLike = async () => {
    try {
      if (!auth.user) {
        toast.error('Please log in to like this blog.', {
          position: toast.TOP_RIGHT,
        })
        return
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}/like`
      )

      if (response.status === 200) {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)

        // Update like count based on like/unlike action
        if (newIsLiked) {
          setLikeCount(prevCount => prevCount + 1)
        } else {
          setLikeCount(prevCount => prevCount - 1)
        }

        // Update local storage
        localStorage.setItem(`isLiked-${blog?.id}`, newIsLiked.toString())

        // Show toast notification
        if (!isLiked) {
          toast.success('Added to Liked', {
            position: toast.TOP_RIGHT,
          })
        } else {
          toast.error('Removed from Liked', {
            position: toast.TOP_RIGHT,
          })
        }

        onLikeAdded(newIsLiked ? likeCount + 1 : likeCount - 1)
      }
    } catch (error) {
      console.error('Error liking blog:', error)
      // Display error toast message
      toast.error('Failed to like the blog. Please try again later.', {
        position: toast.TOP_RIGHT,
      })
    }
  }

  return (
    <>
      <ul className="floating-action-menus">
        <li>
          <button className="flex items-center space-x-2" onClick={handleLike}>
            {auth?.user && isLiked ? (
              <img src={LikeFilledIcon} alt="like" />
            ) : (
              <img src={likeIcon} alt="like" />
            )}
            <span>{likeCount}</span>
          </button>
        </li>
        <li>
          <FavoriteAction blog={blog} />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{blog?.comments?.length}</span>
          </li>
        </a>
      </ul>
    </>
  )
}

export default FloatingAction
