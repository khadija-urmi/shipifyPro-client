import { Link, useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../assets/logInBg.jpg';
import SocialLogin from '../../share/SocialLogIn/SocialLogIn';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signInwithEmail } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(email, password);
    try {
      signInwithEmail(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          toast.success("Successfully Log In!");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(`Login failed,${errorMessage}`);
        });
    } catch (err) {
      console.log(err);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full bg-white overflow-hidden">
        {/* Background Image Section */}
        <div className="w-full lg:w-1/2 h-screen ">
          <img src={img1} alt="Background" className="w-full h-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to Your Account</h2>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primaryClr focus:border-transparent transition-all"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primaryClr focus:border-transparent transition-all"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primaryClr text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Sign In
            </button>

            {/* Register Link */}
            <div className="text-center">
              <Link to="/register" className="text-gray-600 hover:text-primaryClr transition-colors">
                Don't have an account? <span className="font-semibold">Register</span>
              </Link>
            </div>

            {/* Social Login Component */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <SocialLogin loginWithGoogle={true} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
