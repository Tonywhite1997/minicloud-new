import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";
function useGetOneSharedFile(fileID) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ONESHAREDFILE"],
    queryFn: () => api.get(`/share-file/file/${fileID}`),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}

export default useGetOneSharedFile;
