import _ from "lodash";

import { FETCH_USERS } from "./Actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}
