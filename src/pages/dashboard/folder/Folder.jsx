import React from "react";
import useFolderFiles from "../../../customHooks/useFolderFiles";
import { useParams } from "react-router-dom";
import FileUI from "../../../layouts/dashboard/database/FileUI";
import useFolder from "../../../customHooks/useFolders";

function Folder() {
  const { id } = useParams();
  const { data, isLoading, error } = useFolderFiles(id);
  const { data: folders } = useFolder();
  const result = folders?.data;
  const folderName = result?.myFolders?.find(
    (folder) => folder._id == id
  )?.name;

  return (
    <div>
      <p className="font-bold">
        Folders &#62; <span className="text-green-600 "> {folderName}</span>
      </p>
      <FileUI data={data ?? []} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Folder;
