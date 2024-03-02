import React, { useContext, useEffect } from 'react'
import Layout from './Component/Layout/Layout.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Categories from './Component/Categories/Categories.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Products from './Component/Products/Products.jsx'
import Register from './Component/Register/Register.jsx'
import Login from './Component/Login/Login.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import Home from './Component/Home/Home.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'
import Wishlist from './Component/Wishlist/Wishlist.jsx'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx'
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx'
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx'


export default function App() {

  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute>  },
        { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute>  },
        { path: 'shippingaddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute>  },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>  },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>  },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verifycode', element: <VerifyCode /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])
  
  let {setUserToken}=useContext(UserContext)
  useEffect(()=>{
  if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }
  } ,[])
  return <>

      <RouterProvider router={routers}></RouterProvider>
      <Toaster></Toaster>
  </>
}
