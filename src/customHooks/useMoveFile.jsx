import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../main";

function useMoveFile(onClose) {
  const queryClient = useQueryClient();
  const {
    mutate: moveFile,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["MOVEFILE"],
    mutationFn: ({ selectedFolder, fileID }) => {
      let targetFolderID = selectedFolder === "root" ? "" : selectedFolder;
      return api.patch(`/file/move-file/${fileID}`, {
        targetFolderID,
      });
    },
    retry: 1,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries(["FILES"]);
    },
  });
  return { moveFile, error, isPending };
}

export default useMoveFile;
