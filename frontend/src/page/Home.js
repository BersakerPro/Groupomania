import React, { useContext } from "react";
import { UseridContext } from "../components/AppContent";
import LeftNavBar from "../components/LeftNavBar";
import Thread from "../components/Thread";
import Log from "../components/Log";
import NewPostForm from "../components/NewPostForm";

//COMPONENT PAGE HOME
const Home = () => {
  const userid = useContext(UseridContext);

  return (
    <div className="home">
      <LeftNavBar />
      <div className="main">
        <div className="home-header">
          {userid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
