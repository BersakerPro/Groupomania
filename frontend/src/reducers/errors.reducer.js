import { GET_POST_ERRORS } from "../actions/post.action";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { userErrors: [], postErrors: [] };

//REDUCER DES ERREURS
export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postErrors: action.payload,
        userErrors: [],
      };
    case GET_USER_ERRORS:
      return {
        userErrors: action.payload,
        postErrors: [],
      };
    default:
      return state;
  }
}
