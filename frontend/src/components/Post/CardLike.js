import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { isEmpty } from "../Utils";

const CardLike = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  return (
    <div className="like-list">
      {!isEmpty(usersData[0]) &&
        usersData.map((user) => {
          if (user.id === post.likers) {
            return user.pseudo;
          }
        })}
    </div>
  );
};

export default CardLike;
