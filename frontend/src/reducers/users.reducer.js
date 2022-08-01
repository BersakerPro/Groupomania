import { GET_USERS } from "../actions/users.action";

const initialState = {};

//REDUCER DES USERS
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
