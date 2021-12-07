import Mongoose from "mongoose";
import projects from "./projects.js";
import slug from 'mongoose-slug-generator';


Mongoose.plugin(slug);

const { Schema, model } = Mongoose;

const UserStorySchema = new Mongoose.Schema(
  {
    reporter: {
      type: String,
      required: "Reporter is a required field",
    },
    description: {
      type: String,
      required: "Description is a required field",
    },
    title: {
      type: String,
      required: "First Name is a required field",
    },
    assignee: {
      type: String,
      required: "Assignee is a required field",
    },
    // createdDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // lastModifiedDate: {
    //   type: Date,
    //   default: Date.now,
    // },

    status: {
      type: String,
      required: "Status is a required field",
    },
    labels: {
      type: String,
      required: "Labels is a required field",
    },
    completionStatus: {
      type: Boolean,
    },
    projectID: { type: String ,required: "ProjectID is Required",},
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

UserStorySchema.virtual("id", () => this._id.toHexString());
UserStorySchema.set("toJSON", { vituals: true });

const UserStory = Mongoose.model("projectmanagement", UserStorySchema);

export default UserStory;
