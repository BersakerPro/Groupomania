import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { isEmpty } from "../Utils";

const CardLike = () => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  console.log(posts);

  return <div className="like-list">test</div>;
};

export default CardLike;
