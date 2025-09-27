import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetOneSharedFile from "../../customHooks/FileSharing/useGetOneSharedFile";
import { formatDate } from "../../helperFuncs/formatDate";
import useRevokePermissions from "../../customHooks/FileSharing/useRevokePermissions";
import { baseURL } from "../../main";
import useDeleteSharedFile from "../../customHooks/FileSharing/useDeleteSharedFile";
import RenameSharedFile from "./RenameSharedFile";

function BorrowedFiles() {
  const [openRename, setOpenRename] = useState(false);

  const { id } = useParams();

  const { data, isLoading, error } = useGetOneSharedFile(id);
  const { revokeFile: revokeAccess, isPending: revoking } =
    useRevokePermissions();

  const {
    deleteFile,
    error: deleteError,
    isPending: deleting,
  } = useDeleteSharedFile();

  const file = data?.data?.file;

  const [renameDetails, setRenameDetails] = useState({
    oldFileName: file?.name || "",
    fileID: file?._id || "",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen ">
        <p className="text-gray-500 text-lg">Loading borrowed file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen ">
        <p className="text-red-500 text-lg">
          {error?.response?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex justify-center h-screen ">
        <p className="text-gray-500 text-lg">No borrowed file found.</p>
      </div>
    );
  }

  function handleDownload() {
    window.open(`${baseURL}/file/download/${file.fileID}`, "_blank");
  }

  function handleRevoke() {
    if (!window.confirm("Are you sure you want to revoke access to this file?"))
      return;

    revokeAccess(file._id);
  }

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    deleteFile(file._id);
  }

  function handleRename() {
    setRenameDetails({ fileID: file._id, oldFileName: file.name });
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">
          Borrowed File: <span className="text-green-600">{file.name}</span>
        </h1>

        {/* File Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {file.mimetype || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Owner:</span>{" "}
            <span className="text-green-600">{file.ownerEmail}</span>
          </p>
          <p>
            <span className="font-semibold">Recipient:</span>{" "}
            <span className="text-green-600">{file.recipientEmail}</span>
          </p>
          <p>
            <span className="font-semibold">Shared on:</span>{" "}
            {formatDate(file.createdAt)}
          </p>
        </div>

        {/* Permissions as Buttons */}
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">Your available actions:</p>

          {/* Always show Open */}
          <a
            href={file.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow-md transition"
          >
            Open File
          </a>

          {/* Conditional permissions */}
          {file.canDownload && (
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition"
              onClick={() => {
                handleDownload();
              }}
            >
              Download
            </button>
          )}
          {file.canRename && (
            <button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg shadow-md transition"
              onClick={() => {
                setOpenRename(true);
                handleRename();
              }}
            >
              Rename
            </button>
          )}
          {file.canDelete && (
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-2 rounded-lg shadow-md transition"
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>

        {deleteError && (
          <p className="text-center text-red-500">
            {deleteError?.response?.data?.message}
          </p>
        )}

        {/* Revoke Access */}
        <div className="pt-4">
          <button
            onClick={handleRevoke}
            disabled={revoking}
            className="w-full bg-red-600 hover:bg-red-800 text-white font-medium py-2 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {revoking ? "Revoking..." : "Revoke Access"}
          </button>
        </div>
      </div>
      {openRename && (
        <RenameSharedFile
          onClose={() => setOpenRename(false)}
          renameDetails={renameDetails}
        />
      )}
    </div>
  );
}

export default BorrowedFiles;
