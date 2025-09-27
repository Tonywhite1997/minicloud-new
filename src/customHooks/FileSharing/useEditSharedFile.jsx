import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";

function useEditSharedFile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: editSharedFile,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["EDITSHAREDFILE"],
    mutationFn: (newPermissions) => {
      return api.patch(`/share-file/file/edit-permissions`, {
        data: {
          ...newPermissions,
        },
      });
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries(["ONESHAREDFILE"]);
      navigate("/dashboard/shared-files");
    },
  });
  return { editSharedFile, isPending, error, isSuccess };
}

export default useEditSharedFile;
