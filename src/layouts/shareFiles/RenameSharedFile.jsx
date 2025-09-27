import React, { useState } from "react";
import useRenameSharedFile from "../../customHooks/FileSharing/useRenameSharedFile";

function RenameSharedFile({ onClose, renameDetails }) {
  const { oldFileName, fileID } = renameDetails;
  const [fileName, setFileName] = useState(oldFileName || "");

  const { renameFile, isPending, isSuccess, error } =
    useRenameSharedFile(onClose);

  const handleRename = () => {
    if (!fileName.trim()) return;
    renameFile({ newFileName: fileName, fileID });
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Rename File</h2>

        <input
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {error && (
          <p className="text-red-500 text-right">
            {error?.response?.data?.message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={handleRename}
          >
            {isPending ? "Renaming..." : isSuccess ? "Renamed" : "Rename"}
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenameSharedFile;
