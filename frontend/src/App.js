import React, { useEffect, useState } from "react";
import { UseridContext } from "./components/AppContent";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [userid, setUserid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUserid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (userid) {
      dispatch(getUser(userid));
    }
  }, [userid, dispatch]);

  return (
    <UseridContext.Provider value={userid}>
      <Routes />
    </UseridContext.Provider>
  );
};

export default App;
