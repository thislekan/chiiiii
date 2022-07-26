const express = require("express");
const { getCreatedUser, getUser, getUsers } = require("../controllers/index");
const {
  createNewUser,
  fetchAllUsers,
  findUserByUserNameOrId,
} = require("../middlewares/index");

const app = express.Router();

// app.get("/", (_req, res) =>
//   res.status(200).json({
//     message: "Welcome to the chimoney test API endpoints.",
//   })
// );

/**
 * @swagger
 *
 * /api/v1/signup:
 *   put:
 *     summary: This is the signup route
 *     description: Creates or Updates a user and return the user object
 *   produces:
 *       - application/json
 *   parameters:
 *       - name: username
 *         description: A unique value to be used only by the user.
 *         in: body
 *         required: true
 *         type: string
 *       - name: address
 *         description: User's address.
 *         in: body
 *         required: false
 *         type: string
 *       - name: email
 *         description: User's email.
 *         in: body
 *         required: false
 *         type: string
 *       - name: age
 *         description: User's age.
 *         in: body
 *         required: false
 *         type: integer
 *   responses:
 *    201:
 *     description: User created successfully
 *
 */
app.route("/signup").put(createNewUser, getCreatedUser);

/**
 * @swagger
 *
 * /api/v1/users:
 *  get:
 *   summary: This is the get users route to get all users
 *   description: Returns all users
 *  produces:
 *      - application/json
 *  responses:
 *   200:
 *    description: Returns all users
 */
app.route("/users").get(fetchAllUsers, getUsers);

/**
 * @swagger
 *
 * /api/v1/users/{username}:
 *  get:
 *   summary: This is the get user route to get a user using the username
 *   description: Returns a single user
 *  produces:
 *     - application/json
 *  parameters:
 *   - name: username
 *     description: A unique value to be used only by the user.
 *     in: path
 *     required: true
 *     type: string
 *  responses:
 *   200:
 *    description: Returns a single user
 *   404:
 *    description: User not found
 */
app.route("/users/:username").get(findUserByUserNameOrId, getUser);

/**
 * @swagger
 *
 * /api/v1/users/{id}:
 *  get:
 *   summary: This is the get user route to get a user usinf the userId
 *   description: Returns a single user
 *  parameters:
 *   - name: username
 *     description: A unique value to be used only by the user.
 *     in: path
 *     required: true
 *     type: string
 *  responses:
 *   200:
 *    description: Returns a single user
 *   404:
 *    description: User not found
 */
app.route("/users/:id").get(findUserByUserNameOrId, getUser);

module.exports = app;
