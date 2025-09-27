import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";

function useCreateFolder(onClose) {
  const queryClient = useQueryClient();
  const {
    mutate: createFolder,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["NEWFOLDER"],
    mutationFn: (folderName) => {
      return api.post("/folder/create-folder", { name: folderName });
    },
    retry: 1,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries(["FOLDERS"]);
    },
  });

  return { createFolder, isPending, error, isSuccess };
}

export default useCreateFolder;
