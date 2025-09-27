import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";
function useDeleteFile() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["DELETEFILE"],
    mutationFn: (fileID) => {
      return api.delete(`/file/${fileID}`);
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["FILES"]);
    },
  });
  return { deleteFile, isPending, error };
}

export default useDeleteFile;
