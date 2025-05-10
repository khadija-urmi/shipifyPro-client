import { FaShieldAlt, FaRocketchat } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
const ProcessSteps = () => {
    return (
        <div className="max-w-6xl mx-auto py-16">
            <h2 className="text-3xl text-center font-bold mb-12">Our Features</h2>

            <div className="flex justify-around items-center space-x-4">
                {/* Feature Card 1: Parcel Safety */}
                <div className="bg-primaryClr text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <FaShieldAlt className="text-4xl text-primaryClr" />
                        </div>
                    </div>
                    <h3 className="text-xl text-center font-semibold mb-2">Parcel Safety</h3>
                    <p className="text-sm text-center">
                        Rest assured that your parcels are securely handled with our top-notch safety measures, ensuring a safe delivery process.
                    </p>
                </div>

                <div className="bg-primaryClr text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <TbTruckDelivery className="text-4xl text-primaryClr" />
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-center">Super Fast Delivery</h3>
                    <p className="text-sm text-center">
                        With our efficient logistics system, enjoy lightning-fast delivery times that ensure your packages reach their destination in no time.
                    </p>
                </div>

                {/* Feature Card 3: 24/7 Support */}
                <div className="bg-primaryClr text-white p-6 rounded-lg shadow-lg w-1/3">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <FaRocketchat className="text-4xl text-primaryClr" />
                        </div>
                    </div>
                    <h3 className="text-xl text-center font-semibold mb-2">24/7 Support</h3>
                    <p className="text-sm text-center">
                        Our customer support is available 24/7 to answer any questions and assist with any issues regarding your shipments.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProcessSteps;
