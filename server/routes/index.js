/**
 * @swagger
 *
 *   components:
 *     schemas:
 *       UserResponse:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *             description: username of the user
 *             example: "chimoney"
 *             required: true
 *           address:
 *             type: string
 *             description: address of the user
 *             example: "123 Main St"
 *             required: false
 *           email:
 *             type: string
 *             description: email of the user
 *             example: "chi@money.no"
 *             required: false
 *           age:
 *             type: number
 *             description: age of the user
 *             example: 30
 *             required: false
 *           id:
 *             type: string
 *             description: id of the user
 *             example: "123456789"
 *             required: true
 *       UserInput:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *             example: "chimoney"
 *             description: The username of the user
 *             required: true
 *           age:
 *             type: number
 *             example: 25
 *             description: The age of the user
 *             required: false
 *           address:
 *             type: string
 *             example: "123 Main St"
 *             description: The address of the user
 *             required: false
 *           email:
 *             type: string
 *             example: "m@me.co"
 *             description: The email of the user
 *             required: false
 */

const express = require("express");
const { getCreatedUser, getUser, getUsers } = require("../controllers/index");
const {
  createNewUser,
  fetchAllUsers,
  findUserByUserNameOrId,
} = require("../middlewares/index");

const app = express.Router();
const apiVersion = "/api/v1/";

/**
 * @swagger
 *
 * /api/v1/signup:
 *   put:
 *     tags:
 *       - Create or Update Requests
 *     summary: This is the signup route
 *     description: Creates or Updates a user and return the user object
 *     parameters:
 *       - in: header
 *         name: id
 *         description: id of the user (simulates JWT token. for updating users)
 *         required: false
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/UserResponse'
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 */
app.put(`${apiVersion}signup`, createNewUser, getCreatedUser);

/**
 * @swagger
 *
 * /api/v1/users/{username}:
 *   get:
 *     summary: This is the get user route to get a user usinf the userId
 *     description: Returns a single user
 *     tags:
 *       - Read Requests
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *        description: Returns a single user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/UserResponse'
 */
app.get(`${apiVersion}users/:username`, findUserByUserNameOrId, getUser);

/**
 * @swagger
 *
 * /api/v1/users:
 *   get:
 *     summary: This is the get users route to get all users
 *     description: Returns all users
 *     tags:
 *       - Read Requests
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserResponse'
 */
app.get(`${apiVersion}users`, fetchAllUsers, getUsers);

module.exports = app;
