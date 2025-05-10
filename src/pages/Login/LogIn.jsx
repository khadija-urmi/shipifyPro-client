import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/logInBg.jpg';
import SocialLogin from '../../share/SocialLogIn/SocialLogIn';
import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const LogIn = () => {
  const navigate = useNavigate();
  const { signInWithEmail } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    signInWithEmail(data?.email, data?.password)
      .then(res => {
        toast.success('Sign In Successful');
        navigate("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [userCre, setUseCre] = useState(true);
  const [admin, setAdmin] = useState(false);

  const handleCredential = (Credential) => {
    if (Credential === 'user') {
      setUseCre(true);
      setAdmin(false);
    }
    if (Credential === 'admin') {
      setAdmin(true);
      setUseCre(false);
    }
  };

  return (
    <div className="py-10 flex justify-center items-center">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-xl">
        {/* Background Image Section */}
        <div className="mb-6 lg:w-[50%]">
          <img src={img1} alt="Background" className="w-full h-auto" />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center w-full lg:w-[40%] bg-white bg-opacity-30 rounded-lg p-5 lg:p-10 space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <p className="text-4xl text-center text-white font-semibold">Login Now!</p>

            {/* Select Credential Section */}
            <div className="divider py-6 text-center font-semibold">Select Credential</div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                className={`border rounded-full border-[#033B4C] hover:border-black ${userCre && 'bg-black text-white'} p-1 px-4`}
                onClick={() => handleCredential('user')}
              >
                User Credential
              </button>
              <button
                className={`border rounded-full border-[#033B4C] hover:border-black ${admin && 'bg-black text-white'} p-1 px-4`}
                onClick={() => handleCredential('admin')}
              >
                Admin Credential
              </button>
            </div>

            {/* Or Normal User Section */}
            <div className="divider py-6 text-center font-semibold">Or Normal User</div>

            {/* Email Field */}
            <div className="form-control mb-4">
              <p className='text-black'>Email *</p>
              {admin ? (
                <input
                  {...register("email", { required: true })}
                  type="email"
                  defaultValue={"Type ur email"}
                  placeholder="Type here"
                  className="py-3 px-4 input-bordered w-full bg-gray-200"
                />
              ) : (
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Type here"
                  className="py-3 px-4 input-bordered w-full bg-gray-200 "
                />
              )}
              {errors.email && <span className="text-red-600">This field is required</span>}
            </div>

            {/* Password Field */}
            <div className="form-control mb-4">
              <p className="">Password *</p>
              {admin ? (
                <input
                  {...register("password", { required: true })}
                  type="password"
                  defaultValue="Type ur password"
                  placeholder="Type here"
                  className="py-3 px-4 input-bordered w-full bg-gray-200"
                />
              ) : (
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Type here"
                  className="py-3 px-4 input-bordered w-full bg-gray-200 "
                />
              )}
              {errors.password && <span className="text-red-600">This field is required</span>}
            </div>

            {/* Submit Button */}
            <div className="mb-6">
              <button className="bg-primaryClr w-full text-center py-3 text-white mt-3 rounded-lg">
                Login
              </button>
            </div>

            {/* Social Login Component */}
            <SocialLogin />

            {/* Register Link */}
            <div className="text-center">
              <Link to="/register" className="hover:underline text-black flex justify-center">
                New To Our Site? Please <p className="pl-2 font-semibold">Register</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LogIn;
