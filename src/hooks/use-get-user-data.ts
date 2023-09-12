export const useGetUserData = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  return userData;
};
