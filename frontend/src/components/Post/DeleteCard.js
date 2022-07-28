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
      <i className="fas fa-trash"></i>
    </div>
  );
};

export default DeleteCard;
