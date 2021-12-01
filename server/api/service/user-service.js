import User from "../model/user.js";


export const search =(params={})=>{
    
  const promise=User.find(params).exec();
  console.log(promise);
return promise;
};

export const create =(user) =>
{
    const newUser = new User(user);
    return newUser.save();
};

export const update=(user) =>
{
    user._id=user.id;
    const promise= User.findByIdAndUpdate(user.id,user,{new:true}).exec();
    return promise;
}
