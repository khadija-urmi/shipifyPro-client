import { useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../share/SocialLogIn/SocialLogIn";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const { signUpWithEmail,
    updateProfileData } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;
    setErrorMsg("");
    const updateData = {
      displayName: fullName
    }
    try {
      const userInfo = {
        name: fullName,
        email: email,
        role: "User",
      };

      const signUpResponse = await signUpWithEmail(email, password);
      console.log(signUpResponse);

      await updateProfileData(updateData);

      const dbResponse = await axiosPublic.post('http://localhost:5000/users', userInfo);
      if (dbResponse.data.insertedId) {
        Swal.fire({
          title: "Successfully !",
          text: "Signed Up",
          icon: "success"
        });
        console.log('Successfully added to database');
      }
      navigate('/');
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error !",
        text: `Error adding user to database: ${err.message}`,
        icon: "error"
      });
    }
  };


  return (
    <div >
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full  bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-2xl font-semibold text-gray-900">
              Create Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primaryClr hover:text-blue-600">
                Sign in
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryClr focus:border-primaryClr"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryClr focus:border-primaryClr"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryClr focus:border-primaryClr"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryClr hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryClr"
              >
                Create Account
              </button>
            </div>
          </form>
          <div>
            <SocialLogin />
          </div>
        </div>

      </div>

    </div>
  );
};
export default Register;