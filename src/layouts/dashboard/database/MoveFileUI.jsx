import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFolder from "../../../customHooks/useFolders";
import useMoveFile from "../../../customHooks/useMoveFile";

function MoveFileUI({ onClose, onCloseMenu, fileID }) {
  const { data, isLoading, error } = useFolder();
  const result = data?.data;
  const [selectedFolder, setSelectedFolder] = useState("");

  const { id } = useParams();

  const folders = result?.myFolders?.filter((folder) => folder._id !== id);

  const { moveFile, error: moveError, isPending } = useMoveFile(onClose);

  const handleMove = () => {
    moveFile({ selectedFolder, fileID });
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 space-y-4">
        <p className="text-lg font-semibold">Move File</p>

        {isLoading && <p>Loading folders...</p>}
        {error && <p className="text-red-500">Failed to load folders.</p>}

        {folders.length ? (
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select a folder</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
            {id && (
              <option key="root" value="root">
                Root
              </option>
            )}
          </select>
        ) : (
          <p>No folders available</p>
        )}

        <div className="flex justify-end space-x-2">
          {moveError && (
            <p className="text-red-500 text-center">
              {moveError?.response?.data?.message}
            </p>
          )}
          <button
            onClick={() => {
              onClose();
              onCloseMenu();
            }}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleMove}
            disabled={!selectedFolder}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {isPending ? "Moving" : "Move"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoveFileUI;
