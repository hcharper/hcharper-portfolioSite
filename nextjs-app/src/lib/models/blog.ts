import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  snippet?: string;
  body?: string;
  content?: string;
  user?: Types.ObjectId;
  linkedProjects?: Types.ObjectId[];
  twitterEmbeds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  snippet: { type: String },
  body: { type: String },
  content: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  linkedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  twitterEmbeds: [{ type: String }],
}, { timestamps: true });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
