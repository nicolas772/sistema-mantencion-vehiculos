import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import Home from './components/Home.jsx';
import Owners from './components/Owners.jsx';
import Vehicles from './components/Vehicles.jsx';
import ErrorPage from './components/ErrorPage.jsx';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: 'owners',
        element: <Owners></Owners>
      },
      {
        path: 'vehicles',
        element: <Vehicles></Vehicles>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
