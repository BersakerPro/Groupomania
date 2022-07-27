import React, { useState } from "react";
import LeftNavBar from "../LeftNavBar";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "./UploadImage";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorsReducer.userReducer);
  const dispatch = useDispatch();

  const urlImg = `./img/${userData.pseudo}.jpg`;
  console.log(urlImg);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNavBar />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={urlImg} alt="profil-pic" />
          <UploadImage />
          <p>{errors.maxSize}</p>
          <p>{errors.format}</p>
        </div>
        <div className="right-part">
          <div className="bio">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
