import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGetUserData } from "./use-get-user-data";

export const useGetPost = (postId: string) => {
  const userData = useGetUserData();
  const config = useQuery({
    queryKey: ["posts", { postId, userId: userData?.userId }],
    queryFn: () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userData?.userId}&id=${postId}`
        )
        .then((res) => res.data),
    enabled: !!userData?.userId && !!postId,
  });
  return config;
};
