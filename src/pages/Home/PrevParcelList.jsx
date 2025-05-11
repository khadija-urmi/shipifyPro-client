import PrevParcelCard from '../../components/PrevParcel/PrevParcelCard';
import Loading from '../../share/Loading/Loading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const PrevParcelList = () => {
    const axiosPublic = useAxiosPublic();
    const { data: prevParcel = [], isLoading } = useQuery({
        queryKey: ["prevParcel"],
        queryFn: async () => {
            const res = await axiosPublic.get('/recentParcel');
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />
    }
    console.log(prevParcel)
    return (
        <div className='max-w-6xl mx-auto pt-16 mb-16' id='prevParcel'>
            <h2 className='text-3xl font-bold text-primaryClr mb-8 text-center'>Our Previous Parcel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

                {
                    prevParcel?.map(parcel => <PrevParcelCard parcel={parcel} key={parcel._id} />)
                }
            </div>
        </div>
    )
}
export default PrevParcelList;