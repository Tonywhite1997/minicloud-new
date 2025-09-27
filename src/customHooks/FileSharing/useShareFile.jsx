import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../main";

function useShareFile() {
  const navigate = useNavigate();
  const {
    mutate: shareFile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["SHAREFILE"],
    mutationFn: (dataPayload) => api.post("/share-file/share", { dataPayload }),
    retry: 1,
    onSuccess: () => {
      navigate("/dashboard/shared-files");
    },
  });
  return { shareFile, isPending, error };
}

export default useShareFile;
