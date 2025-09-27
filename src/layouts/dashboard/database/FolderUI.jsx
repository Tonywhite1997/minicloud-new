import React, { useState } from "react";
import { FiFolder, FiMoreVertical } from "react-icons/fi";
import FolderOptions from "./FolderOptions";
import useFolders from "../../../customHooks/useFolders";
import { NavLink } from "react-router-dom";
import RenameFolder from "./RenameFolder";

function FolderUI() {
  const [openRename, setOpenRename] = useState(false);
  const [folderID, setFolderID] = useState("");
  const [oldFolderName, setOldFolderName] = useState("");
  const { data, isLoading, error } = useFolders();
  const response = data?.data;

  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="mt-4">
      {isLoading && (
        <p className="text-red-600 text-center">Loading folders...</p>
      )}
      {error && (
        <p className="text-red-600 text-center">
          {error?.response?.data?.message}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {openRename && (
          <RenameFolder
            onClose={() => setOpenRename(false)}
            folderID={folderID}
            oldFolderName={oldFolderName}
          />
        )}
        {response?.myFolders.map((folder) => (
          <div
            key={folder._id}
            className="relative flex flex-col items-center justify-center p-4 rounded-xl shadow hover:shadow-md border border-gray-200 bg-white cursor-pointer transition"
          >
            {/* Three dots button */}
            <button
              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setFolderID(folder._id);
                setOldFolderName(folder.name);
                setOpenMenu(openMenu === folder._id ? null : folder._id);
              }}
            >
              <FiMoreVertical className="text-gray-600" />
            </button>

            {/* Folder icon */}
            <FiFolder className="text-gray-400 text-5xl mb-2" />

            {/* Folder name with ellipses */}
            <NavLink
              to={`/dashboard/folder/${folder._id}`}
              className="text-sm font-medium text-gray-700 truncate w-full text-center max-w-[90%]"
            >
              {folder.name}
            </NavLink>

            {/* Dropdown menu */}
            {openMenu === folder._id && (
              <FolderOptions
                handleOpenRename={() => {
                  setOpenRename(true);
                }}
                folderID={folderID}
                onCloseFolderMenu={() => {
                  setOpenMenu(null);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FolderUI;
