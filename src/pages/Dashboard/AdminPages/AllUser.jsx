import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useUser from '../../../Hooks/useUser';
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


  //const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`)
      return res.data
    }
  })

  // const userCount= users?.map(u=>u.
  //   bookingCount)
  // console.log(userCount)
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
          // timer: 1000
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
          // timer: 1000
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='w-11/12 mx-auto'>
      <div className="min-h-[85vh]">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User’s Name</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead>User Type:</TableHead>
              <TableHead className="text-center">Number of parcels Booked</TableHead>
              <TableHead className="text-right">Make Role Button</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData?.map((user) => (
              <TableRow key={user?._id}>

                <TableCell>{user?.name}</TableCell>
                <TableCell className="text-center">{user?.phone || 'N/A'}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell className="text-center text-green-400 text-xl font-semibold">{user?.bookingCount || 0} </TableCell>
                <TableCell className="text-right space-x-3">
                  <div className='space-y-4 md:space-y-0 md:space-x-3'>

                    <Button onClick={() => makeDeliveryMen(user?._id)}>Make Delivery Men</Button>
                    <Button onClick={() => makeUser(user?._id)}>Make Admin</Button>
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