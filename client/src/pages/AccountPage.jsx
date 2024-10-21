import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
  const {redirect,setRedirect} = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  if(ready && !user && !redirect){
    return <Navigate to={'/login'}/>
  }
  if(!ready){
    return <div>loading..</div>
  }

  async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  
  function linkClasses(type=null){
    let classes = 'py-2 px-6';
    if(subpage === type  ){
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;}

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return(
    <div>
       <nav className="w-full flex justify-center mt-8 gap-4">
       <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My Accomodations</Link>
       </nav>
       {subpage==='profile' && (
        <div className="text-center mx-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br/>
          <button className="primary max-w-md mt-2" onClick={logout}>
            Logout
          </button>
        </div>
        )}
    </div>
  );
}