import React, { memo, useState } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface ConditionNodeData {
  condition: string
  variable?: string
  operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan'
  value?: string | number
}

const ConditionNode: React.FC<NodeProps<ConditionNodeData>> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [condition, setCondition] = useState(data.condition || '')

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    const event = new CustomEvent('nodeUpdate', {
      detail: { id, data: { ...data, condition } }
    })
    window.dispatchEvent(event)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      const event = new CustomEvent('nodeUpdate', {
        detail: { id, data: { ...data, condition } }
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-pink-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Condition</div>
          {isEditing ? (
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
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
              {condition || 'Set condition...'}
            </div>
          )}
          {data.variable && data.operator && (
            <div className="text-xs text-gray-400 mt-1">
              {data.variable} {data.operator} {data.value}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="true" className="w-2 h-2" />
      <Handle type="source" position={Position.Right} id="false" className="w-2 h-2" />
    </div>
  )
}

export default memo(ConditionNode) 