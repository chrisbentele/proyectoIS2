import React from "react";
import { AiFillDelete as Delete } from "react-icons/ai";

export default function DeleteIcon({ deleteById, id }) {
  const onClick = () => {
    deleteById(id);
  };
  return (
    <div>
      <Delete className="deleteSVG" onClick={onClick} />
    </div>
  );
}
