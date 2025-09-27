import React from "react";
import FileUI from "./FileUI";
import useFiles from "../../../customHooks/useFiles";

function Files() {
  const { data, isLoading, error } = useFiles();

  return (
    <div>
      <FileUI data={data ?? []} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Files;
