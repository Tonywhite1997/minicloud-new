import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFile from "../../customHooks/FileSharing/useFile";
import { formatSize } from "../../helperFuncs/formatSize";
import { formatDate } from "../../helperFuncs/formatDate";
import useShareFile from "../../customHooks/FileSharing/useShareFile";

function ShareFile() {
  const { id } = useParams();
  const { data, isLoading, error } = useFile(id);
  const { shareFile, isPending, error: sharingError } = useShareFile();
  const file = data?.data?.file;

  const [shareDetails, setShareDetails] = useState({
    canDelete: false,
    canRename: false,
    canDownload: false,
    recipientEmail: "",
    fileID: id,
    filename: "",
  });

  function handleShare() {
    if (!shareDetails.fileID || !shareDetails.recipientEmail.trim()) return;
    shareFile(shareDetails);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading file details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-red-500 text-lg">{error?.response?.data?.message}</p>
      </div>
    );
  }

  function handleChange(e) {
    const { name, type, checked, value } = e.target;

    setShareDetails((prev) => ({
      ...prev,
      filename: file?.fileName,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  if (!file) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-gray-500 text-lg">No file found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">
          Share File: <span className="text-green-500">{file.fileName}</span>
        </h1>

        {/* File Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Type:</span>{" "}
            {file.mimetype || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {formatSize(file.size)}
          </p>
          <p>
            <span className="font-semibold">Uploaded on:</span>{" "}
            {formatDate(file.createdAt)}
          </p>
        </div>

        {/* Share Form */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Recipient Email</span>
            <input
              type="email"
              onChange={handleChange}
              name="recipientEmail"
              value={shareDetails.recipientEmail}
              placeholder="Enter recipient's email"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </label>

          <p className="text-gray-600 text-sm">
            Choose the permissions for this file. The user will always be able
            to <strong>open</strong> the file.
          </p>

          {/* Permissions */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canRename"
                onChange={handleChange}
                checked={shareDetails.canRename}
                className="rounded text-green-500"
              />
              <span>Allow Rename</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canDelete"
                onChange={handleChange}
                checked={shareDetails.canDelete}
                className="rounded text-green-500"
              />
              <span>Allow Delete</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="canDownload"
                onChange={handleChange}
                checked={shareDetails.canDownload}
                className="rounded text-green-500"
              />
              <span>Allow Download</span>
            </label>
          </div>

          {sharingError && (
            <p className="text-red-500 text-center">
              {sharingError?.response?.data?.message}
            </p>
          )}

          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2 rounded-lg shadow-md transition"
            onClick={handleShare}
          >
            {isPending ? "Sharing" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareFile;
