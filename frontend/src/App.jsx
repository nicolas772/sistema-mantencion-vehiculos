import Sidebar from './components/Sidebar'
import Dropzone from './components/Dropzone'

function App() {

  return (
    <div className="flex h-screen">
      <Sidebar className="w-1/4" />
      <Dropzone className="w-3/4" />
    </div>
  )
}

export default App
