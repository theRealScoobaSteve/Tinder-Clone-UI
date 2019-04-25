export const FETCH_USERS = "FETCH_USERS";

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
