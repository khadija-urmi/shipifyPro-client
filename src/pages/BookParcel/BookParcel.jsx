import { FaClipboardList } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const BookParcel = () => {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [weight, setWeight] = useState(0);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleWeight = (value) => {
        setWeight(value);
        setTotal(value * 50); // Assuming 50 is the price per unit weight
    };

    const onSubmit = (data) => {
        const parcelData = {
            ...data,
            totalPrice: total,
            bookingDate: new Date(),
            parcelWeight: weight,
            status: "pending",
            show: true
        };

        axiosPublic.post('/parcel', parcelData)
            .then(res => {
                Swal.fire({
                    title: "Success",
                    text: `${user?.displayName}'s ${weight} kg parcel successfully booked`,
                    icon: "success",
                });
                navigate('/dashboard/myParcel');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="py-7 flex flex-col justify-center items-center bg-gray-100">
            <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                    Book a Parcel <FaClipboardList size={25} />
                </h2>
            </div>

            <div className="w-11/12 md:w-11/12 lg:w-10/12 bg-white border-2 p-6 rounded-lg shadow-lg">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Name</label>
                        <input
                            className="w-full border-2 border-gray-500 text-blue-400 p-2 rounded-md dark:bg-transparent  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={user?.displayName}
                            disabled
                            {...register("name")}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Email:</label>
                        <input
                            className="w-full border-2 p-2 rounded-md border-gray-500 text-blue-400 dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={user?.email}
                            disabled
                            {...register("email")}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Phone Number:</label>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("phone", { required: true })}
                        />
                        {errors.phone && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Parcel URL */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Parcel URL:</label>
                        <input
                            type="url"
                            placeholder="Parcel URL"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("parcelUrl", { required: true })}
                        />
                        {errors.parcelUrl && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Parcel Type */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Parcel Type:</label>
                        <input
                            type="text"
                            placeholder="Parcel Type"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("parcelType", { required: true })}
                        />
                        {errors.parcelType && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Parcel Weight */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Parcel Weight:</label>
                        <input
                            type="number"
                            placeholder="Parcel Weight"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => handleWeight(e.target.value)}
                        />
                        {errors.parcelWeight && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Receiver Name */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Receiver’s Name:</label>
                        <input
                            type="text"
                            placeholder="Receiver’s Name"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("receiverName", { required: true })}
                        />
                        {errors.receiverName && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Receiver's Phone Number */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Receiver's Phone Number:</label>
                        <input
                            type="number"
                            placeholder="Receiver's Phone Number"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("receiverPhone", { required: true })}
                        />
                        {errors.receiverPhone && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Parcel Delivery Date */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Parcel Delivery Date:</label>
                        <input
                            type="date"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("deliveryDate", { required: true })}
                        />
                        {errors.deliveryDate && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Price (Total Price) */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Price (tk):</label>
                        <input
                            value={total}
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("totalPrice")}
                        />
                    </div>

                    {/* Delivery Address Latitude */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Delivery Address Latitude:</label>
                        <input
                            type="text"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Delivery Address Latitude"
                            {...register("addressLatitude", { required: "This field is required", pattern: { value: /^\d+\.\d+$/, message: "Latitude must be decimal" } })}
                        />
                        {errors.addressLatitude && <span className="text-red-500">{errors.addressLatitude.message}</span>}
                    </div>

                    {/* Delivery Address Longitude */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Delivery Address Longitude:</label>
                        <input
                            type="text"
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Delivery Address Longitude"
                            {...register("addressLongitude", { required: "This field is required", pattern: { value: /^\d+\.\d+$/, message: "Longitude must be decimal" } })}
                        />
                        {errors.addressLongitude && <span className="text-red-500">{errors.addressLongitude.message}</span>}
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Parcel Delivery Address:</label>
                        <textarea
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Parcel Delivery Address"
                            {...register("deliveryAddress", { required: true })}
                        />
                        {errors.deliveryAddress && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-gray-700">Description:</label>
                        <textarea
                            className="w-full border-2 p-2 rounded-md dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Description"
                            {...register("description", { required: true })}
                        />
                        {errors.description && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Submit Button */}
                    <input
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 w-full rounded-md mb-3 cursor-pointer"
                        type="submit"
                        value="Book Parcel"
                    />
                </form>
            </div>
        </div>
    );
};

export default BookParcel;
