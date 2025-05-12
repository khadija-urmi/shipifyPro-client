import { Input } from "@/components/ui/input";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookParcel = () => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const [weight, setWeight] = useState(0)
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleWeight = (value) => {
    let fontWeight = value
    setWeight(fontWeight)
    setTotal(fontWeight * 50)
  }

  const onSubmit = (data) => {
    const parcelData = {
      ...data,
      totalPrice: total,
      bookingDate: new Date(),
      parcelWeight: weight,
      status: 'pending',
      show: true
    }

    axiosPublic.post('/parcel', parcelData)
      .then(res => {
        Swal.fire({
          title: "Success",
          text: `${user?.displayName}'s ${weight} parcel successfully booked`,
          icon: "success",
        });
        navigate('/dashboard/myParcel')
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
            Book a Parcel <FaClipboardList className="text-blue-600 dark:text-blue-400" size={30} />
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Fill in the details to book your parcel</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Sender Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <Input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={user?.displayName}
                  disabled
                  {...register("name")}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <Input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={user?.email}
                  disabled
                  {...register("email")}
                />
              </div>
            </div>

            {/* Parcel Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <Input
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parcel URL</label>
                <Input
                  type="url"
                  placeholder="Enter parcel URL"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("parcelUrl", { required: true })}
                />
                {errors.parcelUrl && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parcel Type</label>
                <Input
                  type="text"
                  placeholder="Enter parcel type"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("parcelType", { required: true })}
                />
                {errors.parcelType && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Parcel Weight (kg)</label>
                <Input
                  onChange={(e) => handleWeight(e.target.value)}
                  type="number"
                  placeholder="Enter weight"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Receiver Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Receiver's Name</label>
                <Input
                  type="text"
                  placeholder="Enter receiver's name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("receiverName", { required: true })}
                />
                {errors.receiverName && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Receiver's Phone</label>
                <Input
                  type="number"
                  placeholder="Enter receiver's phone"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("receiverPhone", { required: true })}
                />
                {errors.receiverPhone && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  {...register("deliveryDate", { required: true })}
                />
                {errors.deliveryDate && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (tk)</label>
                <Input
                  value={total}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  {...register("totalPrice")}
                  disabled
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address Latitude</label>
                <input
                  step="0.0001"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter latitude"
                  {...register("addressLatitude", {
                    required: "This field is required",
                    pattern: {
                      value: /^\d+\.\d+$/,
                      message: "Latitude must be decimal"
                    }
                  })}
                />
                {errors.addressLatitude && (
                  <span className="text-red-500 text-sm">{errors.addressLatitude.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address Longitude</label>
                <input
                  min="0"
                  step="0.0001"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter longitude"
                  {...register("addressLongitude", {
                    required: "This field is required",
                    pattern: {
                      value: /^\d+\.\d+$/,
                      message: "Longitude must be decimal"
                    }
                  })}
                />
                {errors.addressLongitude && (
                  <span className="text-red-500 text-sm">{errors.addressLongitude.message}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Enter delivery address"
                {...register("deliveryAddress", { required: true })}
              />
              {errors.deliveryAddress && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Enter parcel description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Book Parcel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
