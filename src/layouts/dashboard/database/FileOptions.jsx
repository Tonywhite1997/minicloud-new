import React from "react";
import { NavLink } from "react-router-dom";
import useDeleteFile from "../../../customHooks/useDeleteFile";
import { baseURL } from "../../../main";
function FileOptions({ onOpen, onOpenMoveFile, fileID, onCloseMenu }) {
  const { deleteFile, isPending } = useDeleteFile();

  function handleDownload() {
    window.open(`${baseURL}/file/download/${fileID}`, "_blank");
    onCloseMenu();
  }

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this file?")) {
      onCloseMenu();
      return;
    }
    deleteFile(fileID);
  }

  return (
    <div className="absolute top-12 right-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10">
      <ul className="text-sm text-gray-700">
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={onOpen}
        >
          Rename
        </li>
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={handleDelete}
        >
          {isPending ? "Deleting..." : "Delete"}
        </li>
        <li className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
          <NavLink to={`/dashboard/file/share-file/${fileID}`}>Share</NavLink>
        </li>
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={onOpenMoveFile}
        >
          Move
        </li>
        <li
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
          onClick={handleDownload}
        >
          Download
        </li>
      </ul>
    </div>
  );
}

export default FileOptions;
