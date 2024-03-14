import { useContext } from 'react'
import { LikeContext } from '../context'

export const useLike = () => {
  return useContext(LikeContext)
}
