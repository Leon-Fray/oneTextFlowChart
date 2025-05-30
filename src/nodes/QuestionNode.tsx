import React, { memo, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface QuestionNodeData {
  question: string
  responseType?: 'text' | 'number' | 'date' | 'boolean'
}

const QuestionNode: React.FC<NodeProps<QuestionNodeData>> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [question, setQuestion] = useState(data.question || '')

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    const event = new CustomEvent('nodeUpdate', {
      detail: { id, data: { ...data, question } }
    })
    window.dispatchEvent(event)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      const event = new CustomEvent('nodeUpdate', {
        detail: { id, data: { ...data, question } }
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Question</div>
          {isEditing ? (
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
              {question || 'Ask a question...'}
            </div>
          )}
          {data.responseType && (
            <div className="text-xs text-gray-400 mt-1">
              Response type: {data.responseType}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(QuestionNode) 