import React, { useContext } from 'react';
import Log from '../components/Log';
import { UseridContext } from '../components/AppContent';
import UpdateProfil from '../components/Profil/UpdateProfil';

const Profil = () => {
    const userid = useContext(UseridContext)

    return (
        <div className="profil-page">
            {userid ? (
                <UpdateProfil />
            ) : ( 
            <div className='log-container'>
                <Log signin={false} signup={true} />
            </div>
            )}
        </div>
    );
};
export default Profil;