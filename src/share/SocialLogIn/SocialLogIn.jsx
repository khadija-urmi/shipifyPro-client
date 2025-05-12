import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogIn = () => {
    const { GoogleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogIn = () => {
        GoogleLogin()
            .then((result) => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                };

                return axiosPublic.post("/users", userInfo);
            })
            .then((res) => {
                console.log(res.data)
                Swal.fire({
                    title: "Success",
                    text: "user successfully register",
                    icon: "success",
                });
                navigate(from, { replace: true });

            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "user already register",
                    icon: "error",
                });
            });
    };

    return (
        <div className="flex justify-center items-center w-full">
            <button
                onClick={handleGoogleLogIn}
                className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 flex items-center justify-center space-x-2"
            >
                <FaGoogle className="w-5 h-5" />
                <span>Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogIn;