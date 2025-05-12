import ReviewCard from '../../../components/Dashboard/deliveryMenMenus/ReviewCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const MyReviews = () => {
  const { user } = useAuth();
  console.log(user.email)
  const axiosPublic = useAxiosPublic()
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      // const res = await axiosPublic.get(`/parcel/${user?.email}`)
      const res = await axiosPublic.get(`/reviews/${user?.email}`);
      //   console.log(res.data)
      return res.data;
    },
  });
  console.log(reviews)
  return (
    <>
      <h2 className='text-center font-semibold text-3xl my-6 w-11/12 mx-auto'>My Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-12">
        {
          reviews?.map((review) => <ReviewCard key={review._id} review={review} />)
        }

      </div>
    </>
  );
};

export default MyReviews;