/* eslint-disable no-unsafe-optional-chaining */
import React from 'react'

const Field = ({ label, children, htmlFor, error }) => {
  // Generate id for the form field
  const id = htmlFor || getChildId(children)
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {/* Render form field */}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  )
}

// Function to get the id of the child element.
const getChildId = children => {
  const child = React.Children.only(children)

  // Check if child has id prop
  if ('id' in child?.props) {
    return child.props.id
  }
}

export default Field
