import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthProvider";
import EditDoctor from './EditDoctor'
import EditUser from './EditUser'

export default function EditProfile() {
  const [authUser, setAuthUser] = useAuth();
  const role = authUser?.user.role;
  if(role === "médecin"){
    return <EditDoctor/>;
  }
  else{
    return <EditUser/>
  }
}
