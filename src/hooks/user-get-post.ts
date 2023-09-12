import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPost = (postId: string) => {
  const config = useQuery({
    queryKey: ["posts", { postId }],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=1&id=${postId}`)
        .then((res) => res.data),
  });
  return config;
};
