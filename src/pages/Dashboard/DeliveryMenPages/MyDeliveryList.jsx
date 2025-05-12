
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
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../../components/ui/button';
import Swal from 'sweetalert2';
import { MdCancelPresentation } from 'react-icons/md';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import { icon } from 'leaflet';
import useAuth from '../../../Hooks/useAuth';




const MyDeliveryList = () => {
  const { user } = useAuth();
  const { deliveryMenID } = useAuth();
  console.log(deliveryMenID)
  const axiosPublic = useAxiosPublic()


  const { data: deliveryLists = [], isLoading, refetch } = useQuery({
    queryKey: ["deliveryLists", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myDeliveryList/${user?.email}`)
      return res.data
    }
  })
  console.log(deliveryLists)

  const handleCancel = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/deliveryList/${id}`)
          .then(res => {
            refetch()
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            console.log(res.data)
          })
          .catch(err => console.log(err))

      }
    });
  }


  const handleStatus = (id, deliveryMenID) => {
    // console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to update it!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/deliveryList`, { id, deliveryMenID })
          .then(res => {
            refetch()
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            console.log(res.data)
          })
          .catch(err => console.log(err))

      }
    });
  }

  /* ------------------------------- custom icon ------------------------------ */
  const customIcon = new icon({
    iconUrl: 'https://cdn-icons-png.freepik.com/512/535/535137.png',
    iconSize: [44, 44]
  })
  return (
    <div>
      <h2> My Delivery List</h2>

      <div className="">
        <Table>
          <TableCaption>A list of your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Booked User’s Name</TableHead>
              <TableHead>Receivers Name</TableHead>
              <TableHead>Booked User’s Phone
              </TableHead>
              <TableHead>Requested Delivery Date
              </TableHead>
              <TableHead className="text-right">Approximate Delivery Date</TableHead>
              <TableHead className="text-right">Receivers phone number</TableHead>
              <TableHead className="text-right">Receivers Address</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Location</TableHead>
              <TableHead className="text-right">Deliver</TableHead>
              <TableHead className="text-right">Cancel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryLists?.map((list) => (
              // <h2></h2>
              <TableRow key={list?._id}>
                <TableCell className="font-medium">{list?.name}</TableCell>
                <TableCell>{list?.receiverName}</TableCell>
                <TableCell>{list?.phone}</TableCell>
                <TableCell>{list?.deliveryDate}</TableCell>
                <TableCell className="text-right">{list?.approximateDate}</TableCell>
                <TableCell className="text-right">{list?.receiverPhone}</TableCell>
                <TableCell className="text-right">{list?.deliveryAddress}</TableCell>
                <TableCell className="text-right">{list?.status}</TableCell>
                {/* {
              console.log(list?.addressLatitude)
            } */}
                <TableCell className="text-right">
                  {/* location modal */}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Location</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>User Location</DialogTitle>
                        <DialogDescription>
                          See User location.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2 h-60">


                          <MapContainer center={[list?.addressLatitude, -list?.addressLongitude]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[list?.addressLatitude, -list?.addressLongitude]} icon={customIcon}>
                              <Popup>
                                your location.
                              </Popup>
                            </Marker>
                          </MapContainer>


                        </div>

                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* <Location></Location> */}
                </TableCell>
                <TableCell className="text-right"><Button onClick={() => handleStatus(list?._id, list.deliveryMenID)}>Deliver</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline" onClick={() => handleCancel(list?._id)}><MdCancelPresentation /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
};

export default MyDeliveryList;