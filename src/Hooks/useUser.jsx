
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useUser = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    // console.log(user)
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!(user?.email) && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data
        },
        initialData: {}
    })
    return [users, isLoading, refetch]
};

export default useUser;