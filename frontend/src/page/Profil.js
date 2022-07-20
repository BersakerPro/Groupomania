import React, { useContext } from 'react';
import Log from '../components/Log';
import { UseridContext } from '../components/AppContent';

const Profil = () => {
    const userid = useContext(UseridContext)

    return (
        <div className="profil-page">
            {userid ? (
                <h1>UPDATE PAGE</h1>
            ) : ( 
            <div className='log-container'>
                <Log signin={false} signup={true} />
            </div>
            )}
        </div>
    );
};
export default Profil;