import axios from "axios";
import { useState,createContext,useEffect } from "react";


export const UserContext = createContext({});

export function UserContextProvider({children}){
  const [user,setUser] = useState(null);
  useEffect( ()=>{
    if(!user){
      const data = axios.get('/profile').then(({data})=>{
        setUser(data);
      });
      
    }  },[]);
  return(
    <UserContextProvider value={{user,setUser}}>
      {children}
    </UserContextProvider>
    
  )
}