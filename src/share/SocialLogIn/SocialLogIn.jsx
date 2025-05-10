import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { githubLogin, GoogleLogin } = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const handleGoogleLogin = async () => {
        GoogleLogin()
            .then((res) => {
                // console.log(res);
                navigate("/");
                toast.success("login");

                const userData = {
                    userName: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL,
                    role: "user",
                }
                useAxiosPublic.post(`/users/${res.user?.email}`, userData)
                    .then((res) => {
                        console.log(res.data);
                        // navigate('/')
                    });

                // })
            })
            .catch((err) => {
                console.log(err.massage);
            });
    };
    const handleGithubLogin = () => {
        githubLogin()
            .then((res) => {
                // console.log(res);
                navigate("/");
                const userData = {
                    userName: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL,
                    role: "user",
                }
                axiosPublic.post(`/users/${res.user?.email}`, userData)
                    .then((res) => {
                        console.log(res.data);
                        // navigate('/')
                    });
            })
            .catch((err) => {
                console.log(err.massage);
            });
    };
    return (
        <>
            <p className="divider pt-8 pb-6">OR</p>

            <div className="flex justify-center items-center md:gap-6 mx-4">
                <div
                    onClick={handleGoogleLogin}
                    className="text-xl cursor-pointer px-2 bg-white  flex items-center space-x-2"
                >
                    <FcGoogle /> <span className="text-lg font-semibold">Google</span>
                </div>
                <div onClick={handleGithubLogin} className='text-xl px-2 bg-white  flex items-center space-x-2'><FaGithub /><span className='text-lg font-semibold'>Github</span></div>
            </div>
        </>
    );
};

export default SocialLogin;
