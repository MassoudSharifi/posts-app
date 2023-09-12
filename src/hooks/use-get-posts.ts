import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetUserData } from "./use-get-user-data";

export const useGetPosts = () => {
  const userData = useGetUserData();
  const config = useQuery({
    queryKey: ["posts", { userId: userData?.userId }],
    queryFn: () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userData?.userId}`
        )
        .then((res) => res.data),
    enabled: !!userData?.userId,
  });
  return { ...config, userData };
};
