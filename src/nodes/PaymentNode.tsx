import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

interface PaymentNodeData {
  amount: number
  currency: string
  description?: string
}

const PaymentNode: React.FC<NodeProps<PaymentNodeData>> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-teal-500">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold">Payment Request</div>
          <div className="text-xs text-gray-500">
            {data.amount} {data.currency}
          </div>
          {data.description && (
            <div className="text-xs text-gray-400 mt-1">
              {data.description}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(PaymentNode) 