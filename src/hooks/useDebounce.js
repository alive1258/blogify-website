import { useEffect, useRef } from 'react'

// Custom hook for debouncing a callback function
const useDebounce = (callback, delay) => {
  // Create a ref to hold the timeout ID
  const timeoutIdRef = useRef(null)

  // Cleanup function to clear the timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  // Debounced callback function
  const debouncedCallback = (...args) => {
    // If there's an existing timeout, clear it
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    // Set a new timeout for the callback with the specified delay
    timeoutIdRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
  // Return the debounced callback function
  return debouncedCallback
}

export default useDebounce
