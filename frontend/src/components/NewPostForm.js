import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../actions/post.action";
import { isEmpty, timeStampParser } from "./Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const errors = useSelector((state) => state.errorsReducer.postErrors);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("postId", userData._id);
      data.append("message", message);
      if (file) {
        data.append("file", file);
      }
      data.append("video", video);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Vous ne pouvez pas poster un message vide");
    }
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) {
      setIsLoading(false);
    }
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("http://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="form-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <NavLink exact to="/profil">
              <img src="userData.picture" alt="user-img" />
            </NavLink>
          </div>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Écrivez quelque chose"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={postPicture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timeStampParser(Date.now())}</span>
                  </div>
                  <p>{message}</p>
                  <img src="{post.picture}" alt="post-pic" />
                  {video && (
                    <iframe
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <i className="fas fa-image"></i>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              {!isEmpty(errors.format) && <p>{errors.format}</p>}
              {!isEmpty(errors.maxSize) && <p>{errors.maxSize}</p>}
            </div>
            <div className="submit">
              {message || postPicture || video.length > 20 ? (
                <button className="exit" onClick={cancelPost}>
                  Annuler mon post
                </button>
              ) : null}
              <button className="send" onClick={handlePost}>
                Poster mon message
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
