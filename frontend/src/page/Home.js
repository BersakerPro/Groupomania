import React from 'react';
import LeftNavBar from '../components/LeftNavBar';
import Thread from '../components/Thread';

const Home = () => {
    return (
      <div className='home'>
        <LeftNavBar />
        <div className='main'>
            <Thread />
        </div>
      </div>
    );
};

export default Home;