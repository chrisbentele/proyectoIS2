import React from "react";
import { AiOutlineUserAdd as Add } from "react-icons/ai";
import "./addIcon.css";

export default function DeleteIcon({ addById, id }) {
  const onClick = () => {
    addById(id);
  };
  return (
    <div>
      <Add className="addIcon" onClick={onClick} />
    </div>
  );
}
