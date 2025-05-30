import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface Choice {
  id: string
  label: string
}

interface ChoiceNodeData {
  question: string
  choices: Choice[]
}

const ChoiceNode: React.FC<NodeProps<ChoiceNodeData>> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Multiple Choice</div>
          <div className="text-xs text-gray-500">{data.question || 'Ask a question...'}</div>
          {data.choices && data.choices.length > 0 && (
            <div className="mt-2">
              {data.choices.map((choice) => (
                <div key={choice.id} className="text-xs text-gray-600">
                  • {choice.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(ChoiceNode) 