import React from 'react'
import { ReactFlowProvider } from 'reactflow'
import FlowEditor from './components/FlowEditor'
import Sidebar from './components/Sidebar'
import 'reactflow/dist/style.css'

const App: React.FC = () => {
  return (
    <div className="w-[800px] h-[600px] min-w-[800px] min-h-[600px] max-w-full max-h-full flex overflow-auto">
      <ReactFlowProvider>
        <Sidebar />
        <main className="flex-1">
          <FlowEditor />
        </main>
      </ReactFlowProvider>
    </div>
  )
}

export default App 