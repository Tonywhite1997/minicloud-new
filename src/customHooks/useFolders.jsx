import { useQuery } from "@tanstack/react-query";
import { api } from "../main";

function useFolder() {
  const {
    data,
    refetch: getFolders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["FOLDERS"],
    queryFn: () => {
      return api.get("/folder/my-folders");
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading, error, getFolders };
}

export default useFolder;
