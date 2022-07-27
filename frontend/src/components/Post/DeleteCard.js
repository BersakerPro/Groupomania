import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce message ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/trash.png" alt="trash" />
    </div>
  );
};

export default DeleteCard;
