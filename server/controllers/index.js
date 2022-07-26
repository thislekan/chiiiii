/**
 * description: The controller that returns the created user
 *
 * @param {*} req - request object. Should contain at least the username in the body
 * @param {*} res - response object
 * @returns {Object} - user object
 */
const getCreatedUser = async (req, res) => {
  try {
    const { user, errorMsg } = res.locals;

    if (errorMsg) {
      return res.status(401).json({ message: errorMsg });
    }

    if (!user) {
      return res.status(401).json({ message: "Unable to create new user." });
    }
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error getCreatedUser",
    });
  }
};

/**
 * description: The controller that returns a single user object
 *
 * @param {*} req - request object. Should contain at least the username in the route params.
 * @param {*} res - response object
 * @returns {Object} - user object
 */
const getUser = async (req, res) => {
  try {
    const { user } = res.locals;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error getUser",
    });
  }
};

/**
 * description: The controller that returns all users
 *
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {Array[]} - array of user objects
 */
const getUsers = async (req, res) => {
  try {
    const { users } = res.locals;
    if (!users.length) {
      return res.status(200).json({ message: "No users found", users });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error getUsers",
    });
  }
};

module.exports = { getCreatedUser, getUser, getUsers };
