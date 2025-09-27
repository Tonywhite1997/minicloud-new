import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";

function useRenameFolder() {
  const queryClient = useQueryClient();
  const {
    mutate: renameFolder,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["RENAMEFOLDER"],
    mutationFn: ({ newFolderName, folderID }) => {
      return api.patch(`/folder/my-folders/${folderID}`, {
        name: newFolderName,
      });
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["FOLDERS"]);
    },
  });
  return { renameFolder, isPending, error, isSuccess };
}

export default useRenameFolder;
