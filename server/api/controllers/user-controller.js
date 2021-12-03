import { response } from "express";
import * as userService from "../services/user-service.js";

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

export const save = async (request, response) => {
  try {
    const user = { ...request.body };
    const newUser = await userService.create(user);
    setSuccessResponse(newUser, response);
  } catch (e) {
    errorhandler(e.message, response);
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
