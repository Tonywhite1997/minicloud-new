import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";

function useRevokePermissions() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: revokeFile,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["REVOKEPERMISSIONS"],
    mutationFn: (fileID) => {
      return api.patch(`/share-file/file/revoke-permissions`, { fileID });
    },
    retry: 1,
    onSuccess: () => {
      navigate("/dashboard/shared-files");
      queryClient.invalidateQueries(["SHAREDFILES"]);
    },
  });
  return { revokeFile, isPending, error, isSuccess };
}

export default useRevokePermissions;
