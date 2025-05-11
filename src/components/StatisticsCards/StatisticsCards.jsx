import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaBoxes, FaTruck, FaUsers } from "react-icons/fa";

const StatisticsCards = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [parcelsBooked, setParcelsBooked] = useState(0);
    const [parcelsDelivered, setParcelsDelivered] = useState(0);
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setParcelsBooked(12000);
            setParcelsDelivered(11500);
            setUsersCount(5000);
        }, 2000);
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-16">
            <h2 className="text-3xl text-center font-bold mb-12">Delivering Excellence in Numbers</h2>

            <div className="flex justify-around items-center space-x-4">

                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <FaBoxes className="text-4xl text-blue-500" />
                        </div>
                    </div>
                    <h3 className="text-xl text-center font-semibold mb-2">Parcels Booked</h3>
                    <p className="text-sm text-center">
                        <CountUp start={0} end={parcelsBooked} duration={2.5} separator="," />
                    </p>
                </div>


                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <FaTruck className="text-4xl text-green-500" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Parcels Delivered</h3>
                    <p className="text-sm text-center">
                        <CountUp start={0} end={parcelsDelivered} duration={2.5} separator="," />
                    </p>
                </div>


                <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <FaUsers className="text-4xl text-purple-500" />
                        </div>
                    </div>
                    <h3 className="text-xl text-center font-semibold mb-2">App Users</h3>
                    <p className="text-sm text-center">
                        <CountUp start={0} end={usersCount} duration={2.5} separator="," />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCards;
