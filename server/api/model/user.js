import Mongoose from "mongoose";
/**
 * Mongoose schema for user.
 */
const UserSchema = new Mongoose.Schema({
  /**
   * emailId of the user.
   */
  emailId: {
    type: String,
    required: "Email is required",
  },

  /**
   * username of the user.
   */
  userName: {
    type: String,
    required: "Username is required",
  },

  /**
   * password of the user.
   */
  password: {
    type: String
  }
});

UserSchema.virtual("id", () => this._id.toHexString());
UserSchema.set("toJSON", { virtuals: true });

const User = Mongoose.model("User", UserSchema);

export default User;
