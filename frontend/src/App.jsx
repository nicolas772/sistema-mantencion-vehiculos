import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="flex h-screen">
      <Sidebar className="w-1/4" />
      <div className="w-3/4 m-5" >
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
