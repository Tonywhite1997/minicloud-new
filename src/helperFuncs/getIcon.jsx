import React from "react";
import { FaFileAlt, FaVideo, FaImage, FaMusic } from "react-icons/fa";

export function getIcon(mimetype) {
  if (!mimetype) return <FaFileAlt className="text-gray-500" />;

  if (mimetype.includes("video")) return <FaVideo className="text-red-500" />;
  if (mimetype.includes("image")) return <FaImage className="text-blue-500" />;
  if (mimetype.includes("audio"))
    return <FaMusic className="text-purple-500" />;

  return <FaFileAlt className="text-gray-500" />;
}
