import { useQuery } from "@tanstack/react-query";
import { api } from "../main";

function useFiles() {
  const {
    refetch: getFiles,
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["FILES"],
    queryFn: () => api.get("/file/files"),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error, getFiles };
}

export default useFiles;
