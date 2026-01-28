import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  imageSource: 'local';
  localImage?: string;
  siteUrl?: string;
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: {
    type: [String],
    validate: [(arr: string[]) => arr.length <= 6, 'Maximum 6 technologies allowed']
  },
  imageSource: {
    type: String,
    enum: ['local'],
    default: 'local'
  },
  localImage: { type: String },
  siteUrl: { type: String },
  demoLink: { type: String },
  githubLink: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;
