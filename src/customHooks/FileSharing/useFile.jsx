import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";
function useFile(fileID) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["FILE"],
    queryFn: () => api.get(`/file/${fileID}`),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}

export default useFile;
