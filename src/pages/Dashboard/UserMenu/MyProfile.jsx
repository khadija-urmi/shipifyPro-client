import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { uploadImageToServer } from "../../../utility/utils";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaCamera } from "react-icons/fa";

const MyProfile = () => {
    const { user, updateProfileData } = useAuth();

    const [username, setUsername] = useState(user?.displayName || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [newPhoto, setNewPhoto] = useState(null);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username !== user?.displayName) {
                await updateProfileData(username, user?.photoURL)
            }

            if (phoneNumber !== user?.phoneNumber) {
                console.log("Update phone number ", phoneNumber);
            }
            if (newPhoto) {
                const imageURL = await uploadImageToServer(newPhoto);
                await updateProfileData(username, imageURL, phoneNumber);
                setPhoto(imageURL);
            }
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className=" backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 ">
                    {/* Profile Header */}
                    <div className="relative h-32">
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <img
                                    className="w-32 h-32 rounded-full border-4 border-black  shadow-lg"
                                    src={photo}
                                    alt="User profile"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 pb-8 px-8 ">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold">{username}</h2>
                            <p className=" mt-1">{user?.email}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Username Field */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium  ">
                                        <FaUser className="w-4 h-4 mr-2 text-purple-600 " />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/50 text-gray-900  focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-alll"
                                        placeholder="Your Updated Name"
                                        required
                                    />
                                </div>



                                {/* Phone Number Field */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-900">
                                        <FaPhone className="w-4 h-4 mr-2 text-purple-600 " />
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/50 text-gray-900  focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="Your Phone Number"
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

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02]"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;