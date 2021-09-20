/**
 * @file deleteIcon.js
 * @brief Botón para borrar
 */

import React from "react";
import { AiFillDelete as Delete } from "react-icons/ai";
import "./deleteIcon.css";

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
