import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";

function useRenameFile(onClose, onCloseMenu) {
  const queryClient = useQueryClient();
  const {
    mutate: renameFile,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["RENAMEFILE"],
    mutationFn: ({ newFileName, fileID }) => {
      return api.patch(`/file/rename-file`, {
        newFileName,
        id: fileID,
      });
    },
    retry: 1,
    onSuccess: () => {
      onClose();
      onCloseMenu();
      queryClient.invalidateQueries(["FILES"]);
    },
  });
  return { renameFile, isPending, error, isSuccess };
}

export default useRenameFile;
