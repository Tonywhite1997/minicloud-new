import React from "react";
import useDeleteFolder from "../../../customHooks/useDeleteFolder";

function FolderOptions({ handleOpenRename, folderID, onCloseFolderMenu }) {
  const { deleteFolder, isPending } = useDeleteFolder();
  function handleDeleteFolder() {
    if (!window.confirm("Are you sure you want to delete this folder?")) {
      onCloseFolderMenu();
      return;
    }

    deleteFolder(folderID);
  }
  return (
    <div className="absolute top-10 right-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10">
      <ul className="text-sm text-gray-700">
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={() => {
            handleOpenRename();
            onCloseFolderMenu();
          }}
        >
          Rename
        </li>
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={handleDeleteFolder}
        >
          {isPending ? "Deleting..." : "Delete"}
        </li>
      </ul>
    </div>
  );
}

export default FolderOptions;
