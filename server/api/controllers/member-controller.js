import { response } from "express";
import * as memberService from "../services/member-service.js";

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
    const members = await memberService.search();
    setSuccessResponse(members, response);
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
    const member = { ...request.body };
    const newMember = await memberService.create(user);
    setSuccessResponse(newMember, response);
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
    const member = { ...request.body, id };
    const updatedmember = await memberService.update(user);
    setSuccessResponse(updatedmember, response);
  } catch (e) {
    errorhandler(e.message, response);
  }
};
