import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import ManageProduct from "../../pages/Dashboard/ManageProduct/ManageProduct";
import MyPurchase from "../../pages/Dashboard/MyPurchase/MyPurchase";
import Review from "../../pages/Dashboard/Review/Review";
import Faqs from "../../pages/Home/Faqs/Faqs";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Home/Login/Login";
import Register from "../../pages/Home/Register/Register";
import AllProducts from "../../pages/Purchase/AllProducts/AllProducts";
import PrivateRoute from "../../routes/PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";

const router = createBrowserRouter([
{
    path: '/',
    element: <Main></Main>,
    children: [
    {
    path: '/',
    element: <Home></Home>
    },
    {
    path: '/faqs',
    element: <Faqs></Faqs>
    },
    {
    path: '/allProducts',
    element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>
    },
    
    {
    path: '/login',
    element: <Login></Login>
    },
    {
    path: '/register',
    element: <Register></Register>
    }
    ]
},

{
   path: '/dashboard',
   element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
   children: [
    {
    path: '/dashboard',
    element: <MyPurchase></MyPurchase>
    },
    {
        path: '/dashboard/review',
        element:  <Review></Review> 
     },
    {
    path: '/dashboard/allUsers',
    element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
    },
    {
    path: '/dashboard/manageProduct',
    element: <AdminRoute><ManageProduct></ManageProduct></AdminRoute>
    },
    {
        path: '/dashboard/addProduct',
        element: <AdminRoute> <AddProduct></AddProduct> </AdminRoute>
    }
   ]
}
])


export default router;