import Mongoose from "mongoose";
/**
 * Mongoose schema for user.
 */
const MemberSchema = new Mongoose.Schema({
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
});

MemberSchema.virtual("id", () => this._id.toHexString());
MemberSchema.set("toJSON", { virtuals: true });

const Member = Mongoose.model("Member", MemberSchema);

export default Member;
