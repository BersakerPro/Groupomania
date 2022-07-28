import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.action";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdated] = useState(null);
  const dispatch = useDispatch();

  const updatedItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  console.log(userData);
  //const userImgUrl = `./img/${userData.pseudo}.jpg`;

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div>
      <li className="card-container" key={post._id}>
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <>
            <div className="card-left">
              <img
                src={
                  !isEmpty(
                    usersData[0] &&
                      usersData
                        .map((user) => {
                          if (user._id === post.postId) {
                            return user.picture;
                          } else {
                            return null;
                          }
                        })
                        .join("")
                  )
                }
                alt="user-pic"
              />
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>
                    {!isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === post.postId) {
                            return user.pseudo;
                          } else {
                            return null;
                          }
                        })
                        .join("")}
                  </h3>
                </div>
                <span>{dateParser(post.createdAt)}</span>
              </div>
              {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdated(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updatedItem}>
                      Valider modifications
                    </button>
                  </div>
                </div>
              )}
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card-pic" />
              )}
              {post.video && (
                <iframe
                  width="500"
                  height="300"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                    gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
              <div className="card-footer">
                {userData._id === post.postId && (
                  <div className="button-container">
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <i className="fas fa-edit"></i>
                    </div>
                    <DeleteCard id={post._id} />
                  </div>
                )}
                <div className="like-contain">
                  <LikeButton post={post} />
                </div>
              </div>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
