import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import DeleteIcon from "../../components/deleteIcon/deleteIcon";
import "react-table-v6/react-table.css";
import { api } from "../../api";

export default function ProjectMembers() {
  useEffect(() => {
    const populateUsers = async () => {
      try {
        const res = await api.getMembers();
        let users = res.data.filter((user) => user.family_name != null);
        setMembers(users);
      } catch (err) {
        console.log(err);
      }
    };
    populateUsers();
  }, []);
  const removeMember = (id) => {
    window.confirm(`remove ${id} from the project?`);
  };
  const [members, setMembers] = useState([]);
  if (members[0]) console.log(members[0].given_name);

  const columns = [
    {
      Header: "Last Name",
      accessor: "lastname", // String-based value accessors!
    },
    {
      Header: "First Name",
      accessor: "firstname",
    },
    {
      Header: "Nickname",
      accessor: "nickname",
    },
    {
      Header: "",
      accessor: "remove",
    },
  ];

  return (
    <div>
      <ReactTable
        data={members.map((member) => {
          return {
            firstname: member.given_name,
            lastname: member.family_name,
            nickname: member.nickname,
            remove: <DeleteIcon id={member.id} deleteById={removeMember} />,
          };
        })}
        columns={columns}
        showPaginationTop={true}
        showPaginationBottom={false}
        minRows={1}
        defaultPageSize={10}
        loadingText={"Loading"}
        noDataText={"No members found"}
      />
      <div>
        <h3>Add new member</h3>
        <input />
      </div>
    </div>
  );
}
