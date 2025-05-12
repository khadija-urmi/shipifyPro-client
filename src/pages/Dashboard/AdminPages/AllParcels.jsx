import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SweetPagination from "sweetpagination";
import { format } from "date-fns";
import glass from '../../../assets/glass.jpg';
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllParcels = () => {
  const [currentPageData, setCurrentPageData] = useState([]);
  const [lte, setLte] = useState('');
  const [gte, setGte] = useState('');
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

  const onSubmit = (data) => {
    console.log("---------------Form Data---------------", data);


    const select = JSON.parse(data.deliveryMan);
    const deliveryManData = {
      ...data,
      deliveryMan: select.name,
      deliveryMenID: select.id,
      deliveryEmail: select.email,
      status: 'On The Way',
      index: select.index,
    };

    axiosPublic.patch(`/deliveryInfo/${data.parcelId}`, deliveryManData)
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
      .catch((err) => console.error(err));
  };

  console.log(parcels);

  return (
    <div className="w-[95%] mx-auto">
      <div className="flex items-end">
        <div>
          <label htmlFor="" className="text-xl font-semibold">Requested delivery date:</label><br />
          <input onChange={(e) => setLte(e.target.value)} className="border-2 border-gray-300 px-2 mt-3 dark:text-black" type="date" name="gte" />
        </div>
        <div>
          <input onChange={(e) => setGte(e.target.value)} className="border-2 border-gray-300 px-2 dark:text-black" type="date" name="lte" />
        </div>
      </div>

      {/* all parcel card */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-16">
        {parcels?.map((parcel, i) => (
          <article key={parcel._id} className="overflow-hidden rounded-lg border border-gray-100 dark:bg-transparent bg-white shadow-xs h-full">
            <img alt="" src={parcel?.parcelUrl || glass} className="h-56 w-full object-cover" />

            <div className="p-4 sm:p-6">
              <div className="text-xs text-gray-600 dark:text-white">
                <p>Booking date: {format(new Date(parcel?.bookingDate), 'dd-MM-yyyy')}</p>
                <p>Requested Delivery Date: {parcel?.deliveryDate}</p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{parcel?.parcelType}</h3>

              <div>
                <h2>User: {parcel?.name}</h2>
                <h2>Phone: {parcel?.phone}</h2>
              </div>

              <div>
                <h2>Price: {parcel?.totalPrice}</h2>
                <h2>Status: {parcel?.status}</h2>
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-white">
                <span className="font-semibold">Description:</span> {parcel?.description || ' .....'}
              </p>

              <div className="pt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Manage</Button>
                  </DialogTrigger>
                  <DialogTitle>Update Delivery Info</DialogTitle>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Update Delivery Info</DialogTitle>

                    {/* Description for accessibility */}
                    <DialogDescription>
                      Please fill in the form below to update the delivery information for the selected parcel.
                    </DialogDescription>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Delivery Man Name */}
                      <div>
                        <label>Delivery Man Name:</label>
                        <select className="border-2 w-full p-1 rounded-md" {...register("deliveryMan", { required: "This field is required" })}>
                          {delivery?.map((man) => (
                            <option key={man._id} value={JSON.stringify({ id: man._id, email: man.email, name: man.name, index: i })}>
                              {man.name}
                            </option>
                          ))}
                        </select>
                        {errors.deliveryMan && <p className="text-red-500">{errors.deliveryMan.message}</p>}
                      </div>

                      {/* Approximate Date */}
                      <div>
                        <label>Approximate Date</label>
                        <input type="date" className="w-full border-2 p-2 rounded-md" {...register("date")} />
                      </div>

                      {/* Hidden Parcel ID */}
                      <input type="hidden" value={parcel?._id} {...register("parcelId")} />
                    </form>

                    <DialogFooter>
                      <DialogClose asChild>
                        <button type="submit" className="bg-black px-4 py-1 w-full rounded-md text-white mb-3">Submit</button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
