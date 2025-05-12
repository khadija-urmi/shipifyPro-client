import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
    const { GoogleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();


    const handleGoogleLogin = async () => {
        GoogleLogin()
            .then((res) => {

                const userData = {
                    name: res.user?.displayName,
                    photo: res?.user?.photoURL,
                    email: res.user?.email,
                    role: "User",
                }
                console.log(userData)
                axiosPublic
                    .post("/users", userData)
                    .then((res) => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Successfully !",
                                text: "Signed Up",
                                icon: "success"
                            });
                            navigate(from || "/", { replace: true });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error !",
                            text: `Error adding user to database: ${error.message}`,
                            icon: "error"
                        });
                    });

            })
            .catch((err) => {
                console.log(err.massage);
            });
    };

    return (
        <>
            <p className="divider pt-3 pb-2">OR</p>

            <div className="flex justify-center items-center md:gap-6 mx-4">
                <div
                    onClick={handleGoogleLogin}
                    className="text-xl cursor-pointer px-2 bg-white  flex items-center space-x-2"
                >
                    <FcGoogle /> <span className="text-lg font-semibold">Google</span>
                </div>
            </div>
        </>
    );
};

export default SocialLogin;
