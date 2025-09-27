import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";

function useGetSharedFiles() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["SHAREDFILES"],
    queryFn: () => api.get("/share-file/files"),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}

export default useGetSharedFiles;
