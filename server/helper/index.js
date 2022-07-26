const { AppStore } = require("../store/db");

const findUser = ({ username, id }) => {
  const storedUsers = AppStore.getItem("users") || JSON.stringify([]);
  const Users = JSON.parse(storedUsers);
  const foundUser = Users.find(
    (user) => username === user.username || id === user.id
  );
  return { user: foundUser };
};

module.exports = { findUser };
