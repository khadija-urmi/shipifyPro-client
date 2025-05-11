import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Loading from '../../share/Loading/Loading';
import { FaUser, FaEnvelope, FaBox, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PrevParcelDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: recentParcels = [], isLoading, error } = useQuery({
        queryKey: ["parcels", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/recentParcel/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="w-11/12 mx-auto pt-32 pb-16">
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-600 text-center">Error loading parcel details. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-11/12 mx-auto pt-32 pb-16'>
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primaryClr mb-8 transition-colors"
            >
                <FaArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative">
                        <img
                            alt={recentParcels?.parcelType || "Parcel Image"}
                            src={recentParcels?.parcelUrl}
                            className="w-full h-[400px] object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 p-8">
                        <div className="space-y-6">
                            {/* Parcel Type */}
                            <div className="flex items-center gap-3">
                                <FaBox className="h-6 w-6 text-primaryClr" />
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {recentParcels?.parcelType}
                                </h1>
                            </div>

                            {/* Customer Information */}
                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FaUser className="h-5 w-5 text-primaryClr" />
                                        <div>
                                            <p className="text-sm text-gray-500">Customer Name</p>
                                            <p className="font-medium text-gray-800">{recentParcels?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope className="h-5 w-5 text-primaryClr" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-medium text-gray-800">{recentParcels?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaInfoCircle className="h-5 w-5 text-primaryClr" />
                                    <h2 className="text-lg font-semibold text-gray-800">Description</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {recentParcels?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PrevParcelDetails;