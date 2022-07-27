import React, { useContext, useEffect, useState } from "react";
import { UseridContext } from "../AppContent";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";
import CardLike from "./CardLike";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const userid = useContext(UseridContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userid));
    setLiked(true);
  };
  const unlike = () => {
    dispatch(unlikePost(post._id, userid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(userid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userid, post.likers, liked]);

  return (
    <div className="like-container">
      {userid == null && (
        <Popup
          trigger={<img src="./img/like.png" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez vous pour aimer ce post</div>
        </Popup>
      )}
      {userid && liked === false && (
        <img src="./img/like.png" onClick={like} alt="like" />
      )}
      {userid && liked && (
        <img src="./img/liked.png" onClick={unlike} alt="unlike" />
      )}
      <span onClick={() => setShowLikes(!showLikes)}>{post.likers.length}</span>
      {showLikes && <CardLike post={post} />}
    </div>
  );
};

export default LikeButton;
