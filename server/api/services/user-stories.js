import UserStory from "../models/user-stories.js";



export const search = (params = {}) => {
    const promise = UserStory.find(params).exec();
    return promise;
};

export const create = (user) => {
    const newUserStory = new UserStory(user);
    return newUserStory.save();
}

export const update = (userStory) => {
    userStory._id = userStory.id;
    const promise = UserStory.findByIdAndUpdate(userStory.id, userStory, {
        new: true
    }).exec();
    return promise;
}

export const remove = (id) => {
    const promise = UserStory.findByIdAndRemove(id).exec();
    return promise
}