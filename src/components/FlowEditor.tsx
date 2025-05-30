import React, { useCallback, useEffect } from 'react'
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from 'reactflow'
import { useFlowStore } from '../stores/flowStore'
import { nodeTypes } from '../nodes'

const FlowEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { updateNode } = useFlowStore()

  // Track node data updates with a ref to avoid dependencies
  const nodeDataRef = React.useRef<Record<string, any>>({})

  useEffect(() => {
    const handleNodeUpdate = (event: CustomEvent) => {
      const { id, data } = event.detail
      console.log(`Node update event received for node ${id}:`, data)
      
      // Store the updated data in our ref to use during export
      nodeDataRef.current[id] = { ...nodeDataRef.current[id], ...data }
      
      // Also update the store for visual state
      updateNode(id, data)
    }

    window.addEventListener('nodeUpdate', handleNodeUpdate as EventListener)
    return () => {
      window.removeEventListener('nodeUpdate', handleNodeUpdate as EventListener)
    }
  }, [updateNode])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      updateNode(node.id, { position: node.position })
    },
    [updateNode]
  )

  const onNodeDoubleClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // This is handled by the individual node components
      console.log('Configure node:', node)
    },
    []
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      // Get the position where the node was dropped
      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      }

      // Initialize default data based on node type
      let initialData: Record<string, any> = {}
      
      // Create a new node
      const newNodeId = `${type}-${Date.now()}`
      const newNode: Node = {
        id: newNodeId,
        type,
        position,
        data: initialData,
      }

      // Initialize node data in our ref
      nodeDataRef.current[newNodeId] = { ...initialData }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleExport = () => {
    console.log('Export triggered. Node data in ref:', nodeDataRef.current)
    console.log('Current nodes:', nodes)
    
    // Create a structured flow data object
    const flowData = {
      metadata: {
        version: '1.0',
        exportDate: new Date().toISOString(),
        nodeCount: nodes.length,
        edgeCount: edges.length,
      },
      nodes: nodes.map(node => {
        // Get the node data from our ref or fallback to node.data
        const nodeData = nodeDataRef.current[node.id] || node.data || {}
        
        // Create a clean node object with content data
        const cleanNode: Record<string, any> = {
          id: node.id,
          type: node.type,
          // data: { ...nodeData }
        }

        // Add type-specific properties based on node type
        switch (node.type) {
          case 'text':
            cleanNode.text = nodeData.text || ''
            break
          case 'question':
            cleanNode.question = nodeData.question || ''
            cleanNode.responseType = nodeData.responseType || 'text'
            break
          case 'condition':
            cleanNode.condition = nodeData.condition || ''
            cleanNode.variable = nodeData.variable || ''
            cleanNode.operator = nodeData.operator || '=='
            cleanNode.value = nodeData.value || ''
            break
          case 'start':
            cleanNode.label = nodeData.label || 'Flow Start'
            break
          case 'end':
            cleanNode.label = nodeData.label || 'Flow End'
            break
          case 'payment':
            cleanNode.amount = nodeData.amount || 0
            cleanNode.currency = nodeData.currency || 'USD'
            break
          case 'choice':
            cleanNode.options = nodeData.options || []
            cleanNode.label = nodeData.label || 'Choose an option'
            break
        }

        return cleanNode
      }),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        label: edge.label || '',
      })),
    }

    // Print nodes before export for debugging
    console.log('Exported nodes:', flowData.nodes)
    
    // Convert to formatted JSON string
    const jsonString = JSON.stringify(flowData, null, 2)

    // Create a blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `flow-diagram-${new Date().toISOString().split('T')[0]}.json`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <button
            onClick={handleExport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export Flow
          </button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

export default FlowEditor