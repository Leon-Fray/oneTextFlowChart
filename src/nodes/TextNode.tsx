import React, { memo, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface TextNodeData {
  text: string
}

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(data.text || '')

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    // Update the node data through the store, preserving existing data
    const event = new CustomEvent('nodeUpdate', {
      detail: { id, data: { ...data, text } }
    })
    window.dispatchEvent(event)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      // Update the node data through the store, preserving existing data
      const event = new CustomEvent('nodeUpdate', {
        detail: { id, data: { ...data, text } }
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Text Message</div>
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-xs border rounded px-1 w-full"
              autoFocus
            />
          ) : (
            <div 
              className="text-xs text-gray-500 cursor-pointer" 
              onDoubleClick={handleDoubleClick}
            >
              {text || 'Add text...'}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(TextNode) 