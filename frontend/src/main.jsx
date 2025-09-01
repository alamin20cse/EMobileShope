import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
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
import ProfilePage from './pages/ProfilePage.jsx';
import useIsLoggedIn from './hooks/useIsLoggedin.jsx';
import MyCart from './pages/MyCart.jsx';
import OldOrder from './pages/OldOrder.jsx';
import OrderNow from './pages/OrderNow.jsx';
import OldordersDetails from './pages/OldordersDetails.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import DashboardMain from './Dashboard/DashboardMain.jsx';
import PaymentInformation from './pages/PaymentInformation.jsx';
import ReviewShow from './pages/ReviewShow.jsx';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import EditProfile from './pages/EditProfile.jsx';



const queryClient = new QueryClient()


const Protected = ({ children }) => {
   const loaction=useLocation();


  const isLogged = useIsLoggedIn()
  if (!isLogged) {
     return <Navigate state={loaction.pathname} to='/login' > </Navigate>
  }
  return children
}




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
      },
     
    
      {
        path:'/ordernow',
        element:<Protected><OrderNow></OrderNow></Protected>
      },
     
    ]
  },

  {
    path:'/dashboard',
    element:<Protected><Dashboard></Dashboard></Protected>,
    children:[
      {
        path:'/dashboard',
        element:<DashboardMain></DashboardMain>
      },

       {
        path:'/dashboard/profile',
        element:<Protected><ProfilePage /></Protected>
      },
        {
        path:'/dashboard/mycart',
        element:<Protected><MyCart></MyCart></Protected>
      },
      
      {
        path:'/dashboard/oldorder',
        element:<Protected><OldOrder></OldOrder></Protected>
      },
       {
        path:"/dashboard/oldorders/:id",
        element:<Protected><OldordersDetails></OldordersDetails></Protected>
      },
      {
        path:'/dashboard/payment',
        element:<Protected><PaymentInformation></PaymentInformation></Protected>
      },
        {
        path:'/dashboard/review/:id',
        element:<Protected><ReviewShow></ReviewShow></Protected>
      },
      {
        path:'/dashboard/edit-profile',
        element:<EditProfile></EditProfile>
      }
  

    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HelmetProvider>

     <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>


  </HelmetProvider>
  </StrictMode>,
)
