import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface StartNodeData {
  label?: string
}

const StartNode: React.FC<NodeProps<StartNodeData>> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Start</div>
          <div className="text-xs text-gray-500">{data.label || 'Flow Start'}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(StartNode) 