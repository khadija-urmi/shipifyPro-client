import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaArrowRight } from 'react-icons/fa';

const PrevParcelCard = ({ parcel }) => {
    const { parcelUrl, description, parcelType, _id } = parcel || {}

    return (
        <div className="group">
            <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                    <img
                        alt={parcelType}
                        src={parcelUrl}
                        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Content Container */}
                <div className="p-6">
                    {/* Title Section */}
                    <div className="mb-4 flex items-center gap-2">
                        <FaBox className="h-5 w-5 text-primaryClr" />
                        <h3 className="text-xl font-semibold text-gray-800">
                            {parcelType}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="mb-6 text-gray-600 line-clamp-3">
                        {description}
                    </p>

                    {/* Link Button */}
                    <Link
                        to={`/recentParcel/${_id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-primaryClr px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-opacity-90 hover:gap-3"
                    >
                        View
                        <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default PrevParcelCard;