import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.action";
import { isEmpty } from "./Utils";
import Card from "./Post/Card";
import { UseridContext } from "./AppContent";
import CardAdmin from "./Post/CardAdmin";

//COMPONENT DU FLUX D'ACTUALITE DES POSTS
const Thread = () => {
  const [IsAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const userid = useContext(UseridContext);

  useEffect(() => {
    dispatch(getPosts());
    if (userid === process.env.REACT_APP_ADMIN_ID) {
      setIsAdmin(true);
    }
  }, [userid, dispatch]);

  return (
    <div className="post-container">
      {IsAdmin ? (
        <ul>
          {!isEmpty(posts[0]) &&
            posts
              .map((post) => {
                return <CardAdmin post={post} key={post._id} />;
              })
              .reverse()}
        </ul>
      ) : (
        <ul>
          {!isEmpty(posts[0]) &&
            posts
              .map((post) => {
                return <Card post={post} key={post._id} />;
              })
              .reverse()}
        </ul>
      )}
    </div>
  );
};

export default Thread;
