import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (userid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/user/${userid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/api/user/upload", data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`http://localhost:5000/api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: "http://localhost:5000/api/user/" + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};
