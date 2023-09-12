import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPosts = () => {
  const config = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts?userId=1")
        .then((res) => res.data),
  });
  return config;
};
