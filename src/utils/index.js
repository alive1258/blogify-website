export const getDateDifferenceFromNow = fromDate => {
  // Create Date objects for the current date and the provided from date
  const now = new Date()
  const fromDateObj = new Date(fromDate)

  // Calculate the difference in milliseconds between the current date and the provided from date
  const difference = now.getTime() - fromDateObj.getTime()

  // Calculate the difference in days, hours, and minutes
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24))
  const remainingDifference = difference % (1000 * 60 * 60 * 24)
  const hoursDifference = Math.floor(remainingDifference / (1000 * 60 * 60))
  const remainingDifferenceAfterHours = remainingDifference % (1000 * 60 * 60)
  const minutesDifference = Math.floor(
    remainingDifferenceAfterHours / (1000 * 60)
  )

  let message = ''

  // Build the message based on the calculated differences
  if (daysDifference > 0) {
    message += `${daysDifference} day`
    if (daysDifference > 1) {
      message += 's'
    }
  }

  if (hoursDifference > 0) {
    message += ` ${hoursDifference} hour`
    if (hoursDifference > 1) {
      message += 's'
    }
  }

  if (minutesDifference > 0) {
    message += ` ${minutesDifference} minute`
    if (minutesDifference > 1) {
      message += 's'
    }
  }
  // Trim the message and return it, or return '0 minutes' if no difference is found
  return message.trim() || '0 minutes'
}

export const formatDate = dateString => {
  // Define options for formatting the date
  const options = { month: 'long', day: 'numeric', year: 'numeric' }

  // Create a Date object from the given date string
  const date = new Date(dateString)
  // Format the date using the provided options and return the formatted string
  return date.toLocaleDateString('en-US', options)
}
