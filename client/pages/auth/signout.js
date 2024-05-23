import { useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const Signout = () => {

  const signOut = async () => {
    await axios.post('/api/users/signout');
    Router.push('/');
  }

  useEffect(() => {
    signOut();
  }, [])

  return (
    <div>
      Signing you out...
    </div>
  )
}

export default Signout;
