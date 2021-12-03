import { response } from "express";
import * as userService from "../services/user-service.js";
import { check, validationResult } from "express-validator";
import  jwt from "jsonwebtoken";

/**
 * Method to handle the errors
 * @param {*} message, That is to be displayed on error
 * @param {*} response
 */
const errorhandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

/**
 * Method to set the success message
 * @param {*} data , Data to be returned to the http
 * @param {*} response , Response header from http
 */
const setSuccessResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

export const validateUser = () => {
  return [
    check("emailId").exists().isEmail(),
    check("userName").exists().isAlphanumeric(),
    check("password").exists().isLength({ min: 8 }),
  ];
};

/**
 * Method to be called on get http call
 * @param {*} request , request header from http
 * @param {*} response , response header from http
 */

export const index = async (request, response) => {
  try {
    const users = await userService.search();
    setSuccessResponse(users, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

/**
 * Method called on http post
 * @param {*} request , request header from http
 * @param {*} response . response header from http
 */

export const createUser = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({
        message: utilConstants.CLIENT_ERR,
      });
      return;
    }
    // Validate if user already exists
    userService
      .checkUniqueUser(request.body)
      .then((user) => {
        if (user.length) {
          response.status(422);
          response.json({
            message: utilConstants.UNIQUE_EMAIL_USER_ERR,
          });
        } else {
          // after validating
          const newUser = Object.assign({}, request.body);
          const resolve = () => {
            response.status(201).json();
          };
          userService
            .create(newUser)
            .then(resolve)
            .catch(renderErrorResponse(response));
        }
      })
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};

/**
 * Method called on http put
 * @param {*} request , request header from http
 * @param {*} response . response header from http
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const user = { ...request.body, id };
    const updateduser = await userService.update(user);
    setSuccessResponse(updateduser, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};

export const generateLoginToken = (user) => {
  return jwt.sign(
    {
      userName: user.userName,
      userId: user._id,
    },
    utilConstants.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
};

export const loginUser = (request, response) => {
  try {
    const resolve = (user) => {
      if (!user) {
        return response.status(401).json({
          message: "Login Failed",
        });
      }
      if (!request.body.socialAuth) {
        bcrypt.compare(request.body.password, user.password, (err, result) => {
          if (err) {
            return response.status(401).json({
              message: "Login Failed",
            });
          }
          if (result) {
            const jwtToken = generateLoginToken(user);
            return response.status(200).json({
              _id: user._id,
              userName: user.userName,
              emailId: user.emailId,
              image: user.image,
              token: jwtToken,
            });
          }
          return response.status(401).json({
            message: "Login Failed",
          });
        });
      } else {
        const jwtToken = generateLoginToken(user);
        return response.status(200).json({
          _id: user._id,
          userName: user.userName,
          emailId: user.emailId,
          image: user.image,
          token: jwtToken,
        });
      }
    };
    userService
      .loginUser(request.body)
      .then(resolve)
      .catch(renderErrorResponse(response));
  } catch (err) {
    renderErrorResponse(err);
  }
};