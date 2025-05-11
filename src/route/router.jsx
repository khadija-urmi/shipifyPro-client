import {
    createBrowserRouter,
    // RouterProvider,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/LogIn";
import Register from "../pages/Register/Register";
import BookParcel from "../pages/BookParcel/BookParcel";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../components/AboutUs/AboutUs";
import MyProfile from "../pages/MyProfile/MyProfile";
import PrevParcelDetails from "../components/PrevParcel/PrevParcelDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/recentParcel/:id',
                element: <PrivateRoute><PrevParcelDetails /></PrivateRoute>
            },

            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/book-parcel',
                element: <PrivateRoute><BookParcel /></PrivateRoute>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'myProfile',
                // index:true,
                element: <PrivateRoute><MyProfile /></PrivateRoute>
            },
            {
                // path:'/dashboard',
                path: 'bookParcel',
                // index:true,
                element: <PrivateRoute><BookParcel /></PrivateRoute>
            },
            // {
            //     path: 'myParcel',
            //     element: <PrivateRoute><MyParcel /></PrivateRoute>
            // },
            // {
            //     path: 'updateBooking/:id',
            //     loader: ({ params }) => fetch(`https://assignment-12-server-three-sage.vercel.app/parcels/${params.id}`),
            //     element: <PrivateRoute><UpdateBooking /></PrivateRoute>
            // },
            // {
            //     path: 'payment',
            //     element: <PrivateRoute><Payment /></PrivateRoute>
            // },
            // {
            //     path: 'paymentSuccess',
            //     element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
            // },

            // {
            //   path: '/paymentHistory',
            //   element:<PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            //  },
            /* ------------------------------ admin routes ------------------------------ */
            // {
            //     // index:true,
            //     path: 'statistics',
            //     // path:'/dashboard',
            //     element: <PrivateRoute>
            //         {/* <AdminRoutes> */}
            //         <Statistics />
            //         {/* </AdminRoutes> */}
            //     </PrivateRoute>
            // },
            // {
            //     path: 'allUsers',
            //     element: <AdminRoutes><AllUser /></AdminRoutes>
            // },
            // {
            //     path: 'allParcel',
            //     loader: () => fetch('https://assignment-12-server-three-sage.vercel.app/delivery'),
            //     element: <PrivateRoute><AdminRoutes><AllParcels /></AdminRoutes></PrivateRoute>
            // },
            // {
            //     path: 'allDeliveryMen',
            //     // loader:()=>fetch('https://assignment-12-server-three-sage.vercel.app/delivery'),
            //     element: <PrivateRoute>
            //         <AdminRoutes>
            //             <AllDeliveryMen />
            //         </AdminRoutes>
            //     </PrivateRoute>
            // },
            // /* --------------------------- delivery men routes -------------------------- */
            // {
            //     path: 'myDeliveryList',
            //     // loader:()=>fetch('https://assignment-12-server-three-sage.vercel.app/delivery'),
            //     element: <PrivateRoute><DeliveryMenRoutes><MyDeliveryList /></DeliveryMenRoutes></PrivateRoute>
            // },
            // {
            //     path: 'reviews',
            //     // loader:()=>fetch('https://assignment-12-server-three-sage.vercel.app/delivery'),
            //     element: <PrivateRoute><DeliveryMenRoutes><MyReviews /></DeliveryMenRoutes></PrivateRoute>
            // },

        ]
    }

]);

export default router



//   let dashboard ;

// if(admin == 'admin'){
// dashboard = 'admin-home'
// }