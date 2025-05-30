import React from 'react'

const nodeCategories = [
  {
    name: 'Basic',
    nodes: ['start', 'end', 'text'],
  },
  {
    name: 'Interaction',
    nodes: ['question', 'choice'],
  },
  {
    name: 'Logic',
    nodes: ['condition'],
  },
  {
    name: 'Actions',
    nodes: ['payment'],
  },
]

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-48 bg-white border-r border-gray-200 p-2">
      <h2 className="text-sm font-semibold mb-2">Flow Components</h2>
      {nodeCategories.map((category) => (
        <div key={category.name} className="mb-2">
          <h3 className="text-xs font-medium text-gray-500 mb-1">
            {category.name}
          </h3>
          <div className="space-y-1">
            {category.nodes.map((nodeType) => (
              <div
                key={nodeType}
                className="px-2 py-1 border border-gray-200 rounded cursor-move hover:bg-gray-50 text-xs"
                draggable
                onDragStart={(e) => onDragStart(e, nodeType)}
              >
                {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar 