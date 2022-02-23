import { Schema, model } from "mongoose";

interface Tag {
  title: string;
}

const Tag = new Schema<Tag>({
  title: {
    type: String,
    required: true,
  },
});

export default model<Tag>("Tag", Tag);
