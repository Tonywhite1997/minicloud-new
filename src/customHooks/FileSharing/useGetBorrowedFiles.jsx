import { useQuery } from "@tanstack/react-query";
import { api } from "../../main";

function useGetBorrowedFiles() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["BORROWEDFILES"],
    queryFn: () => api.get("/share-file/borrowed-files"),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
}

export default useGetBorrowedFiles;
