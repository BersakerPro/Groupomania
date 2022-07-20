import React, { useEffect, useState } from 'react';
import { UseridContext } from './components/AppContent';
import Routes from './components/Routes'
import axios from "axios"

const App = () => {
  const [userid, setUserid] = useState(null)
  
  useEffect(() => {
    const fetchToken = async() => { 
    await axios({
      method: "get",
      url: "http://localhost:5000/jwtid",
      withCredentials: true
    })
    .then((res) => {
      console.log(res);
      setUserid(res.data)
    })
    .catch((err) => console.log("No token"))
  };
  fetchToken();
  }, [userid]);

  return (
    <UseridContext.Provider value={userid}>
      <Routes />
    </UseridContext.Provider>
  );
};

export default App;