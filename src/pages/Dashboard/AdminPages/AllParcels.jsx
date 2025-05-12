import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SweetPagination from "sweetpagination";
import { format } from "date-fns";
import glass from "../../../assets/glass.jpg";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../share/Loading/Loading";

const AllParcels = () => {
  const [currentPageData, setCurrentPageData] = useState([]);
  const [lte, setLte] = useState("");
  const [gte, setGte] = useState("");
  const delivery = useLoaderData();
  const { setDeliveryMenID } = useAuth();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["parcels", lte, gte],
    queryFn: async () => {
      const res = await axiosPublic.get(`/parcel?gte=${lte}&lte=${gte}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    console.log("---------------Form Data---------------", data);

    try {
      // Check if deliveryMan is a valid JSON string before parsing
      const select = data.deliveryMan ? JSON.parse(data.deliveryMan) : null;

      if (!select) {
        Swal.fire({
          title: "Error!",
          text: "Invalid or missing delivery man information.",
          icon: "error",
        });
        return; // Exit if the delivery man info is invalid
      }

      const deliveryManData = {
        ...data,
        deliveryMan: select.name,
        deliveryMenID: select.id,
        deliveryEmail: select.email,
        status: "On The Way",
        index: select.index,
      };

      axiosPublic
        .patch(`/deliveryInfo/${data.parcelId}`, deliveryManData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success",
              text: "Parcel Successfully Updated.",
              icon: "success",
            });
            refetch();
            reset();
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to update parcel.",
            icon: "error",
          });
        });
    } catch (error) {
      console.error("Error parsing delivery man data:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to process delivery man information.",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-end mt-7">
        <div>
          <label htmlFor="" className="text-xl font-semibold">
            User Requested Date:
          </label>
          <br />
          <input
            onChange={(e) => setLte(e.target.value)}
            className="border-2 border-gray-300 px-2 mt-3 "
            type="date"
            name="gte"
          />
        </div>
        <div>
          <input
            onChange={(e) => setGte(e.target.value)}
            className="border-2 border-gray-300 px-2 "
            type="date"
            name="lte"
          />
        </div>
      </div>

      {/* All Parcel Card */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-16">
        {parcels?.map((parcel, i) => (
          <article
            key={parcel._id}
            className="overflow-hidden rounded-lg border border-gray-100  bg-white shadow-xs h-full"
          >
            <img
              alt=""
              src={parcel?.parcelUrl || glass}
              className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
              <div className="text-xs text-gray-600 ">
                <p>Booking date: {format(new Date(parcel?.bookingDate), "dd-MM-yyyy")}</p>
                <p>Requested Delivery Date: {parcel?.deliveryDate}</p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 ">{parcel?.parcelType}</h3>

              <div>
                <h2>User: {parcel?.name}</h2>
                <h2>Phone: {parcel?.phone}</h2>
              </div>

              <div>
                <h2>Price: {parcel?.totalPrice}</h2>
                <h2>Status: {parcel?.status}</h2>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Description:</span> {parcel?.description || " ....."}
              </p>

              <div className="pt-6">
                <button
                  className="btn bg-primaryClr text-white rounded-md p-4"
                  onClick={() => document.getElementById("my_modal_5").showModal()}
                >
                  open modal
                </button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} className=" ">
                      <div className=" py-4 items-center grid gap-4">
                        {/* Delivery Man Name */}
                        <div>
                          <label>Delivery Man Name:</label>
                          <select className="border-2 w-full p-1 rounded-md" required {...register("deliveryMan")}>
                            {delivery?.map((man) => (
                              <option
                                key={man._id}
                                value={JSON.stringify({ id: man._id, email: man.email, name: man.name, index: i })}
                              >
                                {man.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Approximate Date */}
                        <div>
                          <label htmlFor="">Approximate date</label>
                          <input
                            type="date"
                            className="w-full border-2 p-2 rounded-md"
                            {...register("date")}
                          />
                        </div>

                        {/* Hidden Parcel ID */}
                        <div>
                          <input hidden value={parcel?._id} {...register("parcelId")} />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button className="bg-primaryClr text-white rounded-md py-2 px-8" type="submit">
                        Submit
                      </button>
                    </form>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="my-4">
        <SweetPagination
          width={25}
          navigation={true}
          dataPerPage={5}
          currentPageData={setCurrentPageData}
          getData={parcels}
        />
      </div>
    </div>
  );
};

export default AllParcels;
