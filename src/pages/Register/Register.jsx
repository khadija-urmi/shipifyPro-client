import { useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../share/SocialLogIn/SocialLogIn";
import { uploadImageToServer } from "../../utility/utils";
import axios from "axios";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(null);

  const { signUpWithEmail,
    updateProfileData } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

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
    const imageURL = await uploadImageToServer(image);
    try {
      const userInfo = {
        name: fullName,
        email: email,
        role: "User",
        photoURL: imageURL
      };
      await signUpWithEmail(email, password)
        .then((result) => {
          console.log(result)
          updateProfileData(fullName, imageURL);
          Swal.fire({
            title: "Success",
            text: "user successfully register",
            icon: "success",
          });
          axios.post('http://localhost:5000/users', userInfo)
            .then(res => {
              if (res.data.insertedId) {
                console.log('successfully added database')
              }
              console.log(res.data)
            })
            .catch(err => console.log(err))
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (err) {
      console.log(err)
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
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Upload New Profile Picture
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-black rounded-md cursor-pointer bg-gray-50  focus:outline-none "
                type="file"
                onChange={handleFileChange}
              />
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
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <SocialLogin />
          </div>
        </div>

      </div>

    </div>
  );
};
export default Register;