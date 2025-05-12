import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { BsPencilSquare } from "react-icons/bs";
import { MdCancelPresentation } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "../../../components/ui/input";
import axios from "axios";
import { FaStar } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { format } from "date-fns";
import useAuth from "../../../Hooks/useAuth";

const MyParcel = () => {
  const { setAddress } = useAuth();
  // const [myParcels]
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const [filter, setFilter] = useState("");
  const { user, setTotal, total: price, setParcelIds } = useAuth();
  const axiosPublic = useAxiosPublic();
  // console.log()
  // show data

  const {
    data: myParcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", user?.email, filter],
    queryFn: async () => {
      // const res = await axiosPublic.get(`/parcel/${user?.email}`)
      const res = await axiosPublic.get(
        `/parcel/${user?.email}?search=${filter}`
      );
      return res.data;
    },
  });

  // useEffect(()=>{

  // },[])
  /* ----------------------- set state for checkout form ---------------------- */
  useEffect(() => {
    const total = myParcels?.reduce((a, b) => a + b?.totalPrice, 0);
    setTotal(total)
    // const add = myParcels.find(p=>p?.deliveryAddress)
    // console.log(add)
    // setAddress(add)

  }, [myParcels, setTotal])

  useEffect(() => {
    const parcelIds = myParcels?.map(parcel => parcel._id);
    setParcelIds(parcelIds)
    // console.log(myParcels);
  }, [setParcelIds, myParcels])
  // console.log(cartIds)
  const handleCancel = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/parcel/${id}`)
          .then((res) => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    const reviewData = { ...data, ratting: parseInt(data?.ratting), date: new Date().toLocaleDateString() }
    axiosPublic.post('/reviews', reviewData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "your review successfully added",
            icon: "success",
            //   timer: 1000
          });
        }
        console.log(res.data)

      })
      .catch(err => console.log(err))
  };
  // console.log(myParcels)
  return (
    <div>
      <div className="text-3xl font-semibold text-center my-4">
        <h2>My Parcels</h2>
      </div>

      {/* table */}
      <div className="w-11/12 mx-auto">
        {/* status */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
            {/* <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button> */}
            <label>Filter By Status:</label>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="border-2 p-1 rounded-md"
            >

              <option value="all">All</option>
              <option value="pending">pending</option>

            </select>
            <br />
          </div>
          <NavLink to='/dashboard/payment'><Button><FaMoneyCheckDollar /> Pay</Button></NavLink>

        </div>
        {/* table start */}
        <Table>
          <TableCaption>A list of your recent parcel's.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Parcel Type</TableHead>
              <TableHead>Approximate Delivery Date</TableHead>
              <TableHead>Requested Delivery Date</TableHead>
              <TableHead className="">Booking Date</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead>Delivery Men ID</TableHead>
              <TableHead className="text-right">Booking Status</TableHead>
              <TableHead className="text-right">Payment Status</TableHead>
              <TableHead className="text-right">Update</TableHead>
              <TableHead className="text-right">Cancel</TableHead>
              {/* <TableHead className="text-right">Pay</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {myParcels?.map((parcel) => (
              <TableRow key={parcel?._id}>
                <TableCell className="font-medium">
                  {parcel?.parcelType}
                </TableCell>
                <TableCell>{parcel?.approximateDate}</TableCell>
                <TableCell>{parcel?.deliveryDate}</TableCell>
                <TableCell>{format(new Date(parcel?.bookingDate || 0), 'dd-MM-yyyy')}</TableCell>
                <TableCell>${parcel?.totalPrice}</TableCell>
                <TableCell>{parcel?.deliveryMenID || "N/A"}</TableCell>
                <TableCell className="text-right">{parcel?.status}</TableCell>
                <TableCell className="text-right">{parcel?.PaymentStatus}</TableCell>
                <TableCell className="text-right">
                  {parcel?.status !== "pending" ? (
                    <Button disabled>
                      <BsPencilSquare />
                    </Button>
                  ) : (
                    <Link to={`/dashboard/updateBooking/${parcel?._id}`}>
                      <Button>
                        <BsPencilSquare />
                      </Button>
                    </Link>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {parcel?.status !== "pending" ? (
                    <Button variant="destructive" disabled>
                      <MdCancelPresentation />
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancel(parcel?._id)}
                    >
                      <MdCancelPresentation />
                    </Button>
                  )}
                </TableCell>
                {/* <TableCell className="text-right">
                  <Button>Pay</Button>
                </TableCell> */}
                {parcel?.status === "delivered" && (
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <FaStar />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Review</DialogTitle>
                          <DialogDescription>
                            Make a Awesome review.
                          </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className=" ">
                          <div className=" py-4 items-center grid gap-4">
                            {/* input-0 */}
                            <div className="  ">
                              <div className=" grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Delivery Men ID
                                </Label>
                                <Input
                                  id="id" disabled
                                  value={parcel?.deliveryMenID}
                                  className="col-span-3"
                                  {...register("deliveryMenId", { required: true })}
                                />

                              </div>
                            </div>
                            {/* input-1 */}
                            <div className="  ">
                              <div className=" grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name" disabled
                                  value={user?.displayName}
                                  className="col-span-3"
                                  {...register("name", { required: true })}
                                />
                                <Input type='hidden'

                                  value={parcel.deliveryEmail}

                                  {...register("email", { required: true })}
                                />
                              </div>
                            </div>
                            {/* input-2 */}
                            <div className=" grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="photo" className="text-right">
                                image
                              </Label>
                              <Input disabled
                                id="photo"
                                value={user?.photoURL}
                                className="col-span-3"
                                {...register("photo", { required: true })}
                              />
                            </div>
                            {/* input-3 */}
                            <div className=" grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="photo" className="text-right">
                                Ratting
                              </Label>


                              <Input type="number" className="col-span-3" min={0} max={5} placeholder="0-5" required {...register("ratting", { required: true, minLength: 0, maxLength: 5 })} />
                              {errors.ratting && <span className="text-red-600 col-span-3">Please give me a ratting 0-5</span>}
                            </div>
                            {/* input-4 */}
                            <div className=" grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="feedback" className="text-right">
                                Feedback
                              </Label>


                              <Input type="text" className="col-span-3" placeholder="feedback" required {...register("feedback", { required: true })} />
                              {errors.feedback && <span className="text-red-600 col-span-3">This field is required</span>}
                            </div>
                          </div>
                          <DialogClose asChild>
                            <input
                              className="bg-black px-4 py-1 w-full rounded-md text-white mb-3"
                              type="submit"
                              value="Submit"
                            />
                          </DialogClose>
                        </form>
                        <DialogFooter>
                          {/* <DialogClose asChild>
                          </DialogClose> */}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyParcel;