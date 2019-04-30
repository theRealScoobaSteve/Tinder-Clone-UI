export const FETCH_USERS = "FETCH_USERS";
export const NEXT_IMAGE = "NEXT_IMAGE";
export const LIKE_IMAGE = "LIKE_IMAGE";
export const DISLIKE_IMAGE = "DISLIKE_IMAGE";
export const RESET = "RESET";

export const LIKED = "LIKED";
export const DISLIKED = "DISLIKED";

const Users = [
  {
    id: "1",
    uri: require("../../Images/first.jpg"),
    name: "Amanda",
    age: 26
  },
  {
    id: "2",
    uri: require("../../Images/second.jpg"),
    name: "Jennifer",
    age: 27
  },
  {
    id: "3",
    uri: require("../../Images/third.jpg"),
    name: "Jessica",
    age: 34
  },
  {
    id: "4",
    uri: require("../../Images/fourth.jpg"),
    name: "Margot",
    age: 28
  },
  {
    id: "5",
    uri: require("../../Images/fifth.jpg"),
    name: "Natalie",
    age: 30
  }
];

export function fetchUsers() {
  return {
    type: FETCH_USERS,
    payload: Users
  };
}

export function likeImage() {
  return {
    type: LIKE_IMAGE,
    payload: LIKED
  };
}

export function dislikeImage() {
  return {
    type: DISLIKE_IMAGE,
    payload: DISLIKED
  };
}

export function nextImage() {
  return {
    type: NEXT_IMAGE,
    payload: null
  };
}

export function resetEvent() {
  return {
    type: RESET,
    payload: ""
  };
}
