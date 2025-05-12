import { Input } from "../../../components/ui/input";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaClipboardList } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const UpdateBooking = () => {
  const navigate = useNavigate()
  const { _id, name, email, phone, parcelType, receiverName, receiverPhone, deliveryDate, totalPrice, addressLongitude, addressLatitude, deliveryAddress, bookingDate,
    parcelWeight } = useLoaderData()



  // console.log(status)
  const [total, setTotal] = useState(totalPrice)
  // let fontWeight;
  const [weight, setWeight] = useState(1)
  const axiosPublic = useAxiosPublic()
  // const navigate = useNavigate()
  const [error, setError] = useState([])
  const { user } = useAuth();
  // console.log(createNewUser)
  //   requirement
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const handleWeight = (value) => {
    let fontWeight = value
    // setWeight(value)
    setWeight(fontWeight)
    setTotal(fontWeight * 50)

  }

  // console.log(weight)
  const onSubmit = (data) => {

    const parcelData = {
      ...data, totalPrice: total, bookingDate, parcelWeight: weight, status: 'pending'
    }
    console.log(parcelData, total)
    axiosPublic.patch(`/parcel/${_id}`, parcelData)
      .then(res => {
        Swal.fire({
          title: "Success",
          text: `${user?.displayName}'s ${weight} parcel successfully updated`,
          icon: "success",
          // timer: 1000
        });
        navigate('/dashboard/myParcel')
        console.log(res.data)
      })
      .catch(err => console.log(err))
    // console.log(data);
  };
  return (

    <div>

      {/* form */}
      <div className="my-7 flex flex-col justify-center items-center ">
        <div className="">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            {" "}
            Update a Parcel <FaClipboardList size={25} />
          </h2>
        </div>
        <div className="w-11/12 md:w-11/12 lg:w-10/12 border-2 p-5 rounded-lg">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* input-1 */}
            <div className="space-y-1">
              <label>Name</label>
              {/* <label>Email:</label> */}
              <Input
                // type="text"
                defaultValue={name}
                disabled
                {...register("name")}
              />
            </div>
            {/* input-2 */}
            <div className="space-y-1">
              <label>Email:</label>
              <Input
                defaultValue={email}
                {...register("email")}
                disabled
              />

            </div>
            {/* input-3 */}
            <div className="space-y-1">
              <label>Phone Number:</label>
              <Input
                type="number"
                defaultValue={phone}
                {...register("phone")}
              />
            </div>
            {/* input-4 */}
            <div className="space-y-2">
              <label>Parcel Type:</label>
              <Input
                type="text"
                defaultValue={parcelType}
                {...register("parcelType")}
              />

            </div>
            {/* input-5 */}
            <div className="space-y-1">

              <label>Parcel Weight:</label>
              <Input onChange={(e) => handleWeight(e.target.value)}
                type="number"
                defaultValue={parcelWeight}
              // {...register("parcelWeight", { required: true })}
              />
            </div>

            {/* receivers */}
            {/* receiver input-1 */}
            <div className="space-y-1">
              <label>Receiver’s Name:</label>
              <Input
                type="text"
                defaultValue={receiverName}
                {...register("receiverName")}
              />

            </div>
            {/* receiver input-2 */}
            <div className="space-y-1">
              <label>Receiver's Phone Number:</label>
              <Input
                type="number"
                defaultValue={receiverPhone}
                {...register("receiverPhone", { required: true })}
              />
              {errors.receiverPhone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            {/* receiver input-3 */}
            <div className="space-y-1">
              <label>Parcel Delivery Date:</label>
              <input
                type="date"
                defaultValue={deliveryDate}
                className="w-full border-2 p-2 rounded-md"
                {...register("deliveryDate", { required: true })}
              />
              {errors.deliveryDate && <span className='text-red-500'>This field is required</span>}
            </div>

            {/* receiver input-4 */}
            <div className="space-y-1">
              <label>Price(tk):</label>
              <input
                // type="number"
                value={total}
                className="w-full border-2 p-2 rounded-md"

                {...register("totalPrice")}
              />
              {/* {errors.price && <span className='text-red-500'>This field is required</span>}  */}
            </div>
            {/* receiver input-4 */}
            <div className="space-y-1">
              <label>Delivery Address Latitude:</label>
              <input step="any"
                type="number"
                className="w-full border-2 p-2 rounded-md"
                defaultValue={addressLatitude}
                {...register("addressLatitude", { required: true })}
              />
              {errors.addressLatitude && <span className='text-red-500'>This field is required</span>}
            </div>
            {/* receiver input-5 */}
            <div className="space-y-1">
              <label>Delivery Address longitude:</label>
              <input min="0" step="any"
                type="number"
                defaultValue={addressLongitude}
                className="w-full border-2 p-2 rounded-md"
                {...register("addressLongitude", { required: true })}
              />
              {errors.addressLongitude && <span className='text-red-500'>This field is required</span>}
            </div>
            {/* receiver input-3 */}
            <div className="space-y-1">
              <label>Parcel Delivery Address:</label>
              <textarea
                type="text"
                className="w-full border-2 p-2 rounded-md"
                defaultValue={deliveryAddress}
                {...register("deliveryAddress", { required: true })}
              />
              {errors.deliveryAddress && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <input
              className="bg-black px-4 py-1 w-full rounded-md text-white mb-3"
              type="submit"
              value="Book"
            />
          </form>
        </div>
      </div>
    </div>

  );
};

export default UpdateBooking;