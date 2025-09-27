import { useQuery } from "@tanstack/react-query";
import { api } from "../main";

function useFolderFiles(id) {
  const {
    data,
    refetch: getFolderFiles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["FOLDERFILES", id],
    queryFn: async () => {
      const res = await api.get(`/file/files/${id}`);
      return res;
    },
    retry: 1,
    enabled: !!id,
  });
  return { data, isLoading, error, getFolderFiles };
}

export default useFolderFiles;
