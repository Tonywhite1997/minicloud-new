import React from "react";
import { FaFolderPlus, FaUpload } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import useUploadFile from "../../../customHooks/useUploadFile";

function NewAndUpload({ handleShowFolder }) {
  const location = useLocation().pathname;
  const { id } = useParams();
  const { upload, isSuccess, isPending, error, progress } = useUploadFile(id);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) upload(file);
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <div className="flex gap-6 items-center">
        {!location.includes("folder") && (
          <div
            className="flex justify-center items-center cursor-pointer text-sm gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition"
            onClick={() => handleShowFolder(true)}
          >
            <FaFolderPlus className="text-green-600 text-2xl" />
            <p className="font-medium text-gray-700">New Folder</p>
          </div>
        )}

        <label className="flex justify-center items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-green-700 transition shadow-sm">
          <FaUpload className="text-base" />
          <span>{isPending ? "Uploading..." : "Upload"}</span>
          <input onChange={handleChange} type="file" className="hidden" />
        </label>
      </div>

      {(isPending || isSuccess) && (
        <div className="relative w-64 h-5 border border-gray-300 rounded overflow-hidden bg-white">
          <div
            className="h-full bg-green-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
            {isPending ? `${progress}%` : isSuccess ? "Uploaded!" : ""}
          </span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error?.response?.data?.message}</p>
      )}
    </div>
  );
}

export default NewAndUpload;
