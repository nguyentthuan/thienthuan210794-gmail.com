const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectsSchema = new Schema({
  // title: String,
  // body: String,
  // author: String,
  nameProject: String,
  description: String,
  members:String
}, { timestamps: true });

ProjectsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    nameProject: this.nameProject,
    description: this.description,
    members: this.members,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Projects', ProjectsSchema);