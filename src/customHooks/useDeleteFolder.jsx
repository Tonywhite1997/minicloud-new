import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";
function useDeleteFolder() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteFolder,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["DELETEFOLDER"],
    mutationFn: (folderID) => {
      return api.delete(`/folder/my-folders/${folderID}`);
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["FOLDERS"]);
    },
  });
  return { deleteFolder, isPending, error };
}

export default useDeleteFolder;
