import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";
function useDeleteSharedFile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: deleteFile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["DELETESHAREDFILE"],
    mutationFn: (fileID) => {
      return api.delete("/share-file/file/delete-file", { data: { fileID } });
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["BORROWEDFILES"]);
      navigate("/dashboard/shared-files");
    },
  });
  return { deleteFile, isPending, error };
}

export default useDeleteSharedFile;
