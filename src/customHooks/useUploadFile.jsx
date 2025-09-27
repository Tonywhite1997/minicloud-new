import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";

function useUploadFile(folderID) {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const url = folderID ? `/file/upload/${folderID}` : "/file/upload";

  const {
    mutate: upload,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["UPLOADFILE"],
    mutationFn: (newFile) => {
      const formData = new FormData();
      formData.append("file", newFile);

      return api.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
    },
    retry: 1,
    onSuccess: () => {
      if (folderID) {
        queryClient.invalidateQueries(["FOLDERFILES", folderID]);
      } else {
        queryClient.invalidateQueries(["FILES"]);
      }
    },
  });

  return { upload, isSuccess, isPending, error, progress };
}

export default useUploadFile;
