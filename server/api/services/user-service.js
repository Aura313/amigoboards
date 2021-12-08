import User from "../models/user.js";

export const search = (params = {}) => {
  const promise = User.find(params).exec();
  return promise;
};

export const create = (user) => {
  const newUser = new User(user);
  return newUser.save();
};

export const loginUser = (userObj) => {
  const criteria =
    userObj.userName.indexOf("@") === -1
      ? { userName: userObj.userName }
      : { emailId: userObj.userName };
  const promise = User.findOne(criteria).exec();
  return promise; //test
};

export const update = (user) => {
  user._id = user.id;
  const promise = User.findByIdAndUpdate(user.id, user, { new: true }).exec();
  return promise;
};

export const get = (id) => {
  const promise = User.findById(id).exec();
  return promise;
};

export const checkUniqueUser =(user)=>
{
  const promise = User.find({
    $or: [{ userName: user.userName }, { emailId: user.emailId }],
  }).exec();
  return promise;
}