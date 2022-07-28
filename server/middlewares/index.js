// const Users = require("../db/models/Users");
const { v4: uuidv4 } = require("uuid");
const { UsersStore, AppStore } = require("../store/db");
const { findUser } = require("../helper/index");

/**
 * description: This is the middleware that fetches users by userName or userId
 *
 * @param {{...req, params = { username: string, id: uuidv4 }}} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware
 * @returns next()
 */
const findUserByUserNameOrId = async (req, res, next) => {
  try {
    const { username, id } = req.query;
    if (!username && !id) {
      return res.status(400).json({
        message: `Please provide a username or id.`,
      });
    }

    const { user } = findUser({ username, id });
    if (!user) {
      return res.status(404).json({
        message: `User with username ${username} or id ${id} not found`,
      });
    }
    res.locals.user = user;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {{...req, body = { username="", age, address, email}}} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware
 * @returns next()
 */
const createNewUser = async (req, res, next) => {
  try {
    const { username, address, age, email } = req.body;
    const { id: userId } = req.headers;
    const { user } = findUser({ username });

    if (user && !userId) {
      // this is to simulate what would've happened if JWT token was used to verify the request before update
      res.locals.errorMsg =
        "Unauthorized request made. Please sign in to create a new user.";
      return next();
    }
    let newOrUpdatedUser = null;
    let newUsers = null;

    if (user) {
      newOrUpdatedUser = { ...user, address, age, email };
    } else {
      const id = uuidv4();
      const storedUser = AppStore.getItem("users") || JSON.stringify([]);
      newUsers = [
        ...JSON.parse(storedUser),
        { username, address, age, email, id },
      ];
      newOrUpdatedUser = { username, address, age, email, id };
    }

    AppStore.setItem("users", JSON.stringify(newUsers || UsersStore));
    res.locals.user = newOrUpdatedUser;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = AppStore.getItem("users") || JSON.stringify([]);
    res.locals.users = JSON.parse(users);

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  // updateUser,
  createNewUser,
  fetchAllUsers,
  findUserByUserNameOrId,
};
