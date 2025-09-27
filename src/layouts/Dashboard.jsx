import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NewAndUpload from "./dashboard/database/NewAndUpload";
import Nav from "./dashboard/Nav";
import { useLocation } from "react-router-dom";
import CreateNewFolder from "./dashboard/database/CreateNewFolder";
import useFolder from "../customHooks/useFolders";
import { useEffect } from "react";
import useSendVerifyCode from "../customHooks/useSendVerifyCode";

function Dashboard() {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const location = useLocation().pathname;
  const showUpload =
    !location.includes("profile") &&
    !location.includes("shared-files") &&
    !location.includes("change-password") &&
    !location.includes("share-file") &&
    !location.includes("delete-account");

  const { error, isLoading } = useFolder();
  const { sendCode, error: codeError, isPending } = useSendVerifyCode();

  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    if (!isLoading && error) {
      if (
        error?.response?.data?.message
          .toLowerCase()
          .includes("verify your account")
      ) {
        setIsVerified(false);
      }
    }
  }, [isLoading, error]);

  return (
    <div className="h-screen flex relative flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-20">
        <Nav />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {showCreateFolder && (
            <CreateNewFolder onClose={() => setShowCreateFolder(false)} />
          )}
          {showUpload && isVerified && (
            <NewAndUpload handleShowFolder={setShowCreateFolder} />
          )}
          {!isVerified && (
            <div className="mt-2 flex flex-col justify-center items-center text-red-500 gap-2">
              <p className="text-center">
                Your account is not verified. You need to be verified to upload
              </p>
              <button
                disabled={isPending}
                className="py-3 px-8 bg-green-600 text-white rounded-md cursor-pointer"
                onClick={sendCode}
              >
                {isPending ? "Sending code" : "Verify"}
              </button>
              {codeError && (
                <p className="text-center">
                  {codeError?.response?.data?.message}
                </p>
              )}
            </div>
          )}
          {isVerified && <Outlet />}
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
