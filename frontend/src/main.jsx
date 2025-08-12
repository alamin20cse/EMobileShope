import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import HomeMain from './pages/HomeMain.jsx';
import Home from './pages/Home.jsx';
import ProductDetailes from './pages/ProductDetailes.jsx';
import CategoryProduct from './pages/CategoryProduct.jsx';
import Login from './pages/LoginPage.jsx';
import Logout from './pages/Logout.jsx';
import Register from './pages/RegisterPage.jsx';



const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain></HomeMain>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:`/product/:id`,
        element:<ProductDetailes></ProductDetailes>
      },
      {
        path:`/categori/:id`,
        element:<CategoryProduct></CategoryProduct>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/logout',
        element:<Logout></Logout>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>
  </StrictMode>,
)
