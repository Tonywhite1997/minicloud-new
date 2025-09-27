import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useEditSharedFile from "../../customHooks/FileSharing/useEditSharedFile";
import useGetOneSharedFile from "../../customHooks/FileSharing/useGetOneSharedFile";
import useRevokePermissions from "../../customHooks/FileSharing/useRevokePermissions";
import { formatDate } from "../../helperFuncs/formatDate";

function SharedFile() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOneSharedFile(id);
  const {
    editSharedFile,
    error: errorEditing,
    isPending,
    isSuccess,
  } = useEditSharedFile();

  const {
    revokeFile,
    isPending: revoking,
    isSuccess: revokeSuccess,
    error: revokeError,
  } = useRevokePermissions();

  const file = data?.data?.file;

  const [permissions, setPermissions] = useState({
    canRename: file?.canRename || false,
    canDelete: file?.canDelete || false,
    canDownload: file?.canDownload || false,
    fileID: "",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading shared file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-red-500 text-lg">
          {error?.response?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-gray-500 text-lg">No shared file found.</p>
      </div>
    );
  }

  function handlePermissionChange(e) {
    const { name, checked } = e.target;
    setPermissions((prev) => ({
      ...prev,
      fileID: file._id,
      [name]: checked,
    }));
  }

  function handleSaveChanges() {
    editSharedFile(permissions);
  }

  function handleRevokeAccess() {
    revokeFile(file._id);
  }

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">
          Shared File: <span className="text-green-500">{file.name}</span>
        </h1>

        {/* File Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {file.mimetype || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Owner:</span>{" "}
            <span className="text-green-500">{file.ownerEmail}</span>
          </p>
          <p>
            <span className="font-semibold">Recipient:</span>{" "}
            <span className="text-green-500">{file.recipientEmail}</span>
          </p>
          <p>
            <span className="font-semibold">Shared on:</span>{" "}
            {formatDate(file.createdAt)}
          </p>
        </div>

        {/* Permission Checkboxes */}
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Update the permissions for this shared file.
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canRename"
                checked={permissions.canRename}
                onChange={handlePermissionChange}
                className="rounded text-green-500"
              />
              <span>Allow Rename</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canDelete"
                checked={permissions.canDelete}
                onChange={handlePermissionChange}
                className="rounded text-green-500"
              />
              <span>Allow Delete</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canDownload"
                checked={permissions.canDownload}
                onChange={handlePermissionChange}
                className="rounded text-green-500"
              />
              <span>Allow Download</span>
            </label>
          </div>

          {errorEditing && <p>{errorEditing?.response?.data?.message}</p>}

          <button
            onClick={handleSaveChanges}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow-md transition"
          >
            {isPending
              ? "Saving Changes..."
              : isSuccess
              ? "Changes Saved"
              : "Save Changes"}
          </button>

          <button
            onClick={handleRevokeAccess}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-medium py-2 rounded-lg shadow-md transition"
          >
            {revoking
              ? "Revoking..."
              : revokeSuccess
              ? "Access Revoked"
              : "Revoke Access"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharedFile;
