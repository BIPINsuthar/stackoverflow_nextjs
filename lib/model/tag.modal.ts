import { model, models, Schema, Document, Date } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Assuming 'Question' is another model
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Assuming 'User' is another model
  createdOn: { type: Date, default: Date.now },
});

export const Tag = models.Tag || model("Tag", tagSchema);
