import React from "react";
import { NavLink } from "react-router-dom";
import useGetBorrowedFiles from "../../customHooks/FileSharing/useGetBorrowedFiles";
import useGetSharedFiles from "../../customHooks/FileSharing/useGetSharedFiles";

function SharedFiles() {
  const { data: borrowedFiles, isLoading, error } = useGetBorrowedFiles();
  const {
    data: sharedFiles,
    isLoading: loadingShared,
    error: sharedFilesError,
  } = useGetSharedFiles();

  const borrowed = borrowedFiles?.data?.borrowedFiles || [];
  const shared = sharedFiles?.data?.sharedFiles || [];

  if (isLoading || loadingShared) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading shared files...</p>
      </div>
    );
  }

  if (error || sharedFilesError) {
    return (
      <div className="flex justify-center h-screen">
        <p className="text-red-500 text-lg">
          {error?.response?.data?.message ||
            sharedFilesError?.response?.data?.message ||
            "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      {/* Files You Shared */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">
          Files You Shared
        </h2>
        {shared.length === 0 ? (
          <p className="text-gray-500">You haven’t shared any files yet.</p>
        ) : (
          <ul className="space-y-3">
            {shared.map((file) => (
              <li
                key={file.id}
                className="p-3 border border-gray-200 rounded-lg flex flex-col"
              >
                <NavLink to={`/dashboard/shared-files/${file.id}`}>
                  <span className="font-semibold text-gray-800">
                    {file.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    Shared with:{" "}
                    <span className="text-green-500">
                      {file.recipientEmail}
                    </span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Files Shared With You */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-green-500">
          Files Shared With You
        </h2>
        {borrowed.length === 0 ? (
          <p className="text-gray-500">
            No files have been shared with you yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {borrowed.map((file) => (
              <li
                key={file.id}
                className="p-3 border border-gray-200 rounded-lg flex flex-col"
              >
                <NavLink to={`/dashboard/shared-files/borrowed/${file.id}`}>
                  <span className="font-semibold text-gray-800">
                    {file.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    Shared by:{" "}
                    <span className="text-green-500">{file.ownerEmail}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SharedFiles;
