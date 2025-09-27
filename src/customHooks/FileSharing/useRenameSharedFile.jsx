import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../main";

function useRenameSharedFile(onClose) {
  const queryClient = useQueryClient();
  const {
    mutate: renameFile,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["RENAMESHAREDFILE"],
    mutationFn: ({ newFileName, fileID }) => {
      return api.patch("/share-file/file/rename", {
        newFilename: newFileName,
        fileID,
      });
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["ONESHAREDFILE"]);
      onClose();
    },
  });
  return { renameFile, isPending, error, isSuccess };
}

export default useRenameSharedFile;
