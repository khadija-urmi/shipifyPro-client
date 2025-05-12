import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/LogIn";
import Register from "../pages/Register/Register";
import BookParcel from "../pages/BookParcel/BookParcel";
import AboutUs from "../components/AboutUs/AboutUs";
import PrivateRoute from "./PrivateRoute";
import MyParcel from "../pages/Dashboard/UserMenu/MyParcel";
import UpdateBooking from "../pages/Dashboard/updateBooking/UpdateBooking";
import Statistics from "../pages/Dashboard/AdminPages/Statistics";
import AllUser from "../pages/Dashboard/AdminPages/AllUser";
import AllParcels from "../pages/Dashboard/AdminPages/AllParcels";
import AllDeliveryMen from "../pages/Dashboard/AdminPages/AllDeliveryMen";
import MyDeliveryList from "../pages/Dashboard/DeliveryMenPages/MyDeliveryList";
import MyReviews from "../pages/Dashboard/DeliveryMenPages/MyReviews";
import AdminRoutes from "./AdminRoutes";
import DeliveryMenRoutes from "./DeliveryMenRoutes";
import MyProfile from "../pages/Dashboard/UserMenu/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: 'myProfile',
                element: <MyProfile />
            },
            {

                path: 'bookParcel',
                element: <BookParcel />
            },
            {
                path: "myParcel",
                element: <MyParcel />,
            },
            {
                path: "updateBooking/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/parcels/${params.id}`),
                element: <UpdateBooking />,
            },
            /* ------------------------------ admin routes ------------------------------ */
            {
                // index:true,
                path: 'statistics',
                // path:'/dashboard',
                element: <PrivateRoute>
                    {/* <AdminRoutes> */}
                    <Statistics />
                    {/* </AdminRoutes> */}
                </PrivateRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoutes><AllUser /></AdminRoutes>
            },
            {
                path: 'allParcel',
                loader: () => fetch('http://localhost:5000/delivery'),
                element: <PrivateRoute><AdminRoutes><AllParcels /></AdminRoutes></PrivateRoute>
            },
            {
                path: 'allDeliveryMen',
                element: <PrivateRoute>
                    <AdminRoutes>
                        <AllDeliveryMen />
                    </AdminRoutes>
                </PrivateRoute>
            },
            /* --------------------------- delivery men routes -------------------------- */
            {
                path: 'myDeliveryList',
                element: <PrivateRoute><DeliveryMenRoutes><MyDeliveryList /></DeliveryMenRoutes></PrivateRoute>
            },
            {
                path: 'reviews',
                element: <PrivateRoute><DeliveryMenRoutes><MyReviews /></DeliveryMenRoutes></PrivateRoute>
            },
        ],
    },
]);

export default router;



//   let dashboard ;

// if(admin == 'admin'){
// dashboard = 'admin-home'
// }