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
  const posts = useSelector((state) => state.postReducer);
  const errors = useSelector((state) => state.errorsReducer.userReducer);
  const dispatch = useDispatch();

  console.log(posts);

  const NumberPost = () => {
    let array = [];
    console.log(posts);
    for (let i = 0; i < posts.length; i++) {
      if (i.postId === userData._id) {
        array.push(i);
      }
    }
    return array.length;
  };
  console.log(NumberPost());

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <LeftNavBar />
      <div className="profil-container">
        <h1>Profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={userData.picture} alt="profil-pic" />
            <UploadImage />
          </div>
          <div className="right-part">
            <div className="bio">
              <h3>Bio</h3>
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
                  </p>
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
            <p className="NumberLikes">
              Nombre de likes : {userData.likes ? userData.likes.length : 0}
            </p>
            <p>Nombre de message posté : {NumberPost()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfil;
