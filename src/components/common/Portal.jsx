import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
  // Find the mount element where the children will be rendered
  const mountElement = document.getElementById('portal-root')

  // Use createPortal to render the children into the mount element
  return createPortal(children, mountElement)
}

export default Portal
