import { useNavigate } from "react-router-dom";
import Img from "../../assets/error.png";
const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="text-center p-4">
            <img src={Img} alt="Error" className="max-w-2xl mx-auto rounded-md mb-4" />
            <h1 className="text-3xl font-semibold text-red-600">Oops! Page Not Found</h1>
            <p className="text-gray-600 mt-4 mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
            <button
                onClick={handleGoHome}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Back to Homepage
            </button>
        </div>
    );
};

export default ErrorPage;