import Img from "../../assets/Banner.jpg";

const Banner = () => {
  return (
    <div className="bg-cover bg-no-repeat h-screen bg-center" style={{ backgroundImage: `url(${Img})`, height: "550px" }}>
      <div className="bg-[#00000042] w-full h-full flex justify-center items-center">
        <div className="w-11/12 md:w-1/2 mx-auto text-center text-white space-y-3">
          <h2 className="text-2xl md:text-5xl font-bold">
            Enhance Your Delivery and Tracking Experience
          </h2>
          <p className="text-sm md:text-base">
            Manage shipments with ease, get real-time updates, and ensure your deliveries arrive on time, every time.
          </p>

          <a href="#recentParcel">
            <button className="my-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all duration-300 transform hover:scale-105">
              Start Shipping Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
