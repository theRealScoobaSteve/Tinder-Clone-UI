import _ from "lodash";

import {
  FETCH_USERS,
  NEXT_IMAGE,
  LIKE_IMAGE,
  DISLIKE_IMAGE,
  RESET
} from "./Actions";

export function UsersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}

export function IndexReducer(state = 0, action) {
  switch (action.type) {
    case NEXT_IMAGE:
      return ++state;
    default:
      return state;
  }
}

export function EventReducer(state = "", action) {
  switch (action.type) {
    case LIKE_IMAGE:
      return action.payload;
    case DISLIKE_IMAGE:
      return action.payload;
    case RESET:
      return action.payload;
    default:
      return state;
  }
}
