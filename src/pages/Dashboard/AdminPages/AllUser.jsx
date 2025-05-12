import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { Button } from '../../../components/ui/button';
import Swal from 'sweetalert2';
import SweetPagination from "sweetpagination";
import useAuth from '../../../Hooks/useAuth';


const AllUser = () => {
  const [currentPageData, setCurrentPageData] = useState([]);
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic()
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`)
      return res.data
    }
  })

  const makeDeliveryMen = (id) => {
    console.log(id)
    axiosPublic.patch(`/changeRole/${id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "User Role Successfully Modified. ",
            icon: "success",
          });

        }
        console.log(res.data)
        refetch()
      })
      .catch(err => console.log(err))
  }
  const makeUser = (id) => {
    // console.log(id)
    axiosPublic.patch(`/changeAdminRole/${id}`)
      .then(res => {
        refetch()
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "User Role Successfully Modified. ",
            icon: "success",
          });

        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='w-11/12 mx-auto'>
      <div className="min-h-[85vh]">
        <Table>
          <TableCaption>A list of all registered users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>User Type:</TableHead>
              <TableHead className="text-center">Number of parcels Booked</TableHead>
              <TableHead className="text-center ">Change The Role</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData?.map((user) => (
              <TableRow key={user?._id}>

                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell className="text-center text-gray-400 text-xl font-semibold">{user?.bookingCount || 0} </TableCell>
                <TableCell className="text-right space-x-3">
                  <div className='space-y-4 md:space-y-0 md:space-x-3'>

                    <button className='bg-primaryClr text-white rounded-md py-2 px-8' onClick={() => makeDeliveryMen(user?._id)}> Delivery Men</button>
                    <button className='bg-primaryClr text-white rounded-md py-2 px-8' onClick={() => makeUser(user?._id)}> Admin</button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      <div>
        <div className="">
          <SweetPagination
            width={25}
            navigation={true}
            dataPerPage={5}
            currentPageData={setCurrentPageData}
            getData={users}
          />
        </div>

      </div>



    </div>
  );
};

export default AllUser;