const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Technologies/stack - max 6 items
  technologies: {
    type: [String],
    validate: [arr => arr.length <= 6, 'Maximum 6 technologies allowed']
  },
  // Image source type: 'local' uses uploaded image
  imageSource: {
    type: String,
    enum: ['local'],
    default: 'local'
  },
  // For local images: filename in /public/projects/
  localImage: { type: String },
  // Site URL for the project
  siteUrl: { type: String },
  // Demo/live link for the project
  demoLink: { type: String },
  // GitHub repository link (optional - shows GitHub logo if provided)
  githubLink: { type: String },
  // Featured projects appear first
  featured: { type: Boolean, default: false },
  // Order for manual sorting
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
