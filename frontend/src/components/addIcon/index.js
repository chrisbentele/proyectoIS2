/**
 * @file index.js
 * @brief Botón para agregar ícono
 */
import React from "react";
import { AiOutlineUserAdd as Add } from "react-icons/ai";
import "./addIcon.css";

export default function AddIcon({ addById, id }) {
  const onClick = () => {
    console.log(`id is ${id}`);
    addById(id);
  };
  return (
    <div>
      <Add className="addIcon" onClick={onClick} />
    </div>
  );
}
