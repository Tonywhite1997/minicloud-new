import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";

function useLogout() {
  const {
    isSuccess,
    error,
    refetch: logout,
    isLoading,
  } = useQuery({
    queryKey: ["LOGOUT"],
    queryFn: () => api.get("/auth/logout"),
    enabled: false,
  });
  return { logout, isLoading, isSuccess, error };
}

export default useLogout;
