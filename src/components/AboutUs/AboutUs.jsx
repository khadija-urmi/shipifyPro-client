import { FaShippingFast, FaDollarSign, FaLock } from "react-icons/fa";
import aboutUsImage from "../../assets/about-1.jpg";
import aboutUsImage2 from "../../assets/about-2.png";

const AboutUs = () => {
    return (
        <div className="bg-blue-50 py-16 px-4 md:px-16">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">

                <div className="md:w-1/2 w-full flex   items-center">
                    <img
                        src={aboutUsImage}
                        alt="Courier Service"
                        className="w-[350px] h-[500px] object-cover rounded-lg shadow-lg"
                    />
                    <img
                        src={aboutUsImage2}
                        alt="Courier Service"
                        className="w-[250px] h-[300px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Section - Text */}
                <div className="md:w-1/2 w-full text-center md:text-left">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">
                        30+ Years Experiences in Courier Service
                    </h2>
                    <p className="text-lg mb-6 text-gray-700">
                        ShipifyPro stands out as the best choice for your courier needs due to our user-friendly interface, efficient service, reliable tracking, and dedicated customer support for all clients.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <FaShippingFast className="text-5xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Fast Delivery</h3>
                                <p className="text-gray-700">Experience rapid delivery times with ShipifyPro, ensuring your packages reach their destination quickly and efficiently, every time.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaDollarSign className="text-4xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Lowest Cost</h3>
                                <p className="text-gray-700">Enjoy competitive pricing with ShipifyPro, providing affordable courier services without compromising on quality or reliability for your shipments.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaLock className="text-4xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600">Secured Services</h3>
                                <p className="text-gray-700">Trust in our secure service, where your packages are handled with care through the entire delivery process, ensuring peace of mind.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;