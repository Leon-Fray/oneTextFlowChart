// Create a container for our extension
const container = document.createElement('div')
container.id = 'flow-weaver-extension'
document.body.appendChild(container)

// Create a button to toggle the extension
const toggleButton = document.createElement('button')
toggleButton.textContent = 'Flow Weaver'
toggleButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

// Add click handler to toggle the extension
toggleButton.addEventListener('click', () => {
  const extension = document.getElementById('flow-weaver-extension')
  if (extension) {
    extension.style.display = extension.style.display === 'none' ? 'block' : 'none'
  }
})

document.body.appendChild(toggleButton)

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'EXPORT_FLOW') {
    // Handle flow export
    console.log('Exporting flow:', message.data)
  } else if (message.type === 'IMPORT_FLOW') {
    // Handle flow import
    console.log('Importing flow:', message.data)
  }
}) 