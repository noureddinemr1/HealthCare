import { useAuth } from "../context/AuthProvider"
import UserApp from "./UserApp"
import DoctorApp from "./DoctorApp"
import { useEffect, useState } from "react"
import Loading from "./Loading";

export default function Appointments() {
  const [loading,setLoading] = useState(true);
  const [authUser,setAuthUser] = useAuth();
  useEffect(()=>{
      setTimeout(() => {
        setLoading(false);
      }, 400);
    
  },[])
  if (loading){
    return <Loading/>
  }  
    
    if (authUser?.user.role ==="citoyen") return <UserApp/>
    else{
      return <DoctorApp/>
    }
}
