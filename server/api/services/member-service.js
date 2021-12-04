import Member from "../models/member.js";

export const search = (params = {}) => {
  const promise = Member.find(params).exec();
  console.log(promise);
  return promise;
};

export const create = (Member) => {
  const newMember = new User(member);
  return newMember.save();
};

export const update = (member) => {
    member._id = member.id;
  const promise = Member.findByIdAndUpdate(member.id, member, { new: true }).exec();
  return promise;
};
