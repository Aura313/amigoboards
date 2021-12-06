import { response } from "express";
import * as userStoryService from "../services/user-stories.js"

const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const userStory = await userStoryService.get(id);
        setSuccessResponse(userStory, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
}

export const index = async (request, response) => {
    try {
        const userStories = await userStoryService.search();
        setSuccessResponse({message: `UserStories fetched successfully`, userStories}, response);
    } catch (e) {
        errorhandler(e.message, response);
    }
};

export const save = async (request, response) => {
    try {
        const userStory = {...request.body};
        const newUserStory = await userStoryService.create(userStory);
        console.log(userStory, newUserStory, "oeoeoeo");
        setSuccessResponse(newUserStory, response);
    } catch(e) {
        console.log(e.message, "message");
        errorhandler(e.message, response);
    }
};

export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const userStory = {
            ...request.body,
            id
        }
        const updatedUserStory = await userStoryService.update(userStory);
        setSuccessResponse({message: `UserStory ${id} updated successfully`, updatedUserStory}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const userStory = await userStoryService.remove(id);
        setSuccessResponse({message: `UserStory ${id} removed successfully`}, response);
    } catch(e) {
        errorhandler(e.message, response);
    }
}
