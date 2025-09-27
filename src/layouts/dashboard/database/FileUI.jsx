import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatSize } from "../../../helperFuncs/formatSize";
import { getIcon } from "../../../helperFuncs/getIcon.jsx";
import FileOptions from "./FileOptions";
import RenameFile from "./RenameFile";
import MoveFileUI from "./MoveFileUI";

function FileUI({ data, isLoading, error }) {
  const response = data?.data;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openFileRename, setOpenFileRename] = useState(false);
  const [moveFile, setMoveFile] = useState(false);

  const [fileName, setFileName] = useState("");
  const [fileID, setFileID] = useState("");

  return (
    <div className="mt-4">
      {isLoading && (
        <p className="text-red-600 text-center">Loading files...</p>
      )}
      {error && (
        <p className="text-red-600 text-center">
          {error?.response?.data?.message}
        </p>
      )}

      {openFileRename && (
        <RenameFile
          onClose={() => setOpenFileRename(false)}
          oldFileName={fileName}
          fileID={fileID}
          onCloseMenu={() => setOpenMenuId(null)}
        />
      )}

      {moveFile && (
        <MoveFileUI
          fileID={fileID}
          onCloseMenu={() => setOpenMenuId(null)}
          onClose={() => {
            setMoveFile(false);
          }}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {!isLoading &&
          response?.files.map((file) => (
            <div
              key={file._id}
              className="relative flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
            >
              {/* File Info */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="text-2xl">{getIcon(file.mimetype)}</div>
                <div
                  className="min-w-0"
                  onClick={() => window.open(file.link, "_blank")}
                >
                  <p className="truncate font-medium text-gray-800 w-40 sm:w-56 lg:w-64">
                    {file.fileName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              {/* Options Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === file._id ? null : file._id);
                  setFileID(file._id);
                  setFileName(file.fileName);
                }}
                className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100"
              >
                <BsThreeDotsVertical />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === file._id && (
                <FileOptions
                  onCloseMenu={() => setOpenMenuId(null)}
                  fileID={fileID}
                  onOpenMoveFile={() => {
                    setMoveFile(true);
                  }}
                  onOpen={() => {
                    setOpenFileRename(true);
                  }}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FileUI;
