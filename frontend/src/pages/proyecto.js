  
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated,isLoading, getAccessTokenSilently } = useAuth0();
    const [proyecto,setProyecto] = useState()
    const [data ,setData] = useState()

  useEffect(()=>{
      const getProyecto = async() =>{
        const token =  await getAccessTokenSilently()
        console.log(token)
          const data =await fetch("http://localhost:8000/api/proyecto",{headers:{"auth-token":token}})
          setData(data)
          console.log(data)
      }
      if (isAuthenticated){
        getProyecto()
      }
    setProyecto()
  },[isLoading])
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div>
        
        {JSON.stringify(data)}
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;