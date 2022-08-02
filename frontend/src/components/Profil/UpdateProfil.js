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
  //const errors = useSelector((state) => state.errorsReducer.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  const NumberPost = () => {
    let array = [];
    for (let post of posts) {
      if (post.postId === userData._id) {
        array.push(post);
      }
    }
    console.log(array);
    return array.length;
  };

  return (
    <>
      <LeftNavBar />
      <div className="profil-container">
        <h1>Profil de {userData.pseudo}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img id="img-profile" src={userData.picture} alt="profil-pic" />
            <UploadImage />
          </div>
          <div className="right-part">
            <div className="bio">
              <h3>Bio</h3>
              {updateForm === false && (
                <>
                  <p
                    className="content-bio"
                    onClick={() => setUpdateForm(!updateForm)}
                  >
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
            <span>Posts : {NumberPost()}</span>
            <span>Likes : {userData.likes ? userData.likes.length : 0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfil;
