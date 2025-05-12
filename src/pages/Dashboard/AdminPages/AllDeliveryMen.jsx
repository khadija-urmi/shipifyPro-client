import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
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
import { FaStar } from 'react-icons/fa';

const AllDeliveryMen = () => {
  const axiosPublic = useAxiosPublic()
  const { data: delivery = [], isLoading } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allDelivered`)
      return res.data
    }
  })
  console.log(delivery)
  return (
    <div>
      <div className='w-11/12 mx-auto'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Delivery Man's Name</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Number of parcels delivered</TableHead>
              <TableHead className="text-right">Average review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delivery?.map((deliveryMen) => (
              <TableRow key={deliveryMen?._id}>
                <TableCell>{deliveryMen?.name}</TableCell>
                <TableCell className="text-center ">{deliveryMen?.phone || 'N/A'}</TableCell>
                <TableCell className="text-center text-green-400 text-xl font-semibold">{deliveryMen?.deliveredCount}</TableCell>
                <TableCell className="text-right">
                  <Button>{deliveryMen?.avgRating} <FaStar /></Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllDeliveryMen;