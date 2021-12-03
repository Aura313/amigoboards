import Mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

Mongoose.plugin(slug);

const { Schema, model } = Mongoose;

/**
 * Create a schema mapping to MogoDB Collection
 */
const ProjectsSchema = new Schema(
  {
    // _id: {
    //   type: Mongoose.Schema.Types.ObjectId,
    //   index: true,
    //   required: true,
    //   auto: true,
    // },
    title: {
      type: String,
      required: 'Title is a required field!',
    },
    description: {
      type: String,
    },
    slug: { type: String, slug: 'title' },
    owner: { type: String, required: 'Owner is a required field!' },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

ProjectsSchema.virtual('id', () => this._id.toHexString());
ProjectsSchema.set('toJSON', {
  virtuals: true,
});

/**
 * Set  model which will be compiled from Schema definitions
 */

const Projects = model('projects', ProjectsSchema);

export default Projects;
