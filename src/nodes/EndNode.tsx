import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface EndNodeData {
  label?: string
}

const EndNode: React.FC<NodeProps<EndNodeData>> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-red-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">End</div>
          <div className="text-xs text-gray-500">{data.label || 'Flow End'}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(EndNode) 