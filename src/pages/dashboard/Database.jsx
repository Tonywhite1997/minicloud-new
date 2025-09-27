import React from "react";
import Files from "../../layouts/dashboard/database/Files";
import Folders from "../../layouts/dashboard/database/Folders";

function Database() {
  return (
    <div>
      <Folders />
      <Files />
    </div>
  );
}

export default Database;
