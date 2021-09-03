import React from "react";

export default function Projects(props) {
  console.log(props.match.params.id);
  const projects = [
    { name: "Project 1" },
    { name: "Project 2" },
    { name: "Project 3" },
    { name: "Project 4" },
  ];

  return (
    <div>
      {projects.map((project) => (
        <p>{project.name}</p>
      ))}
    </div>
  );
}
