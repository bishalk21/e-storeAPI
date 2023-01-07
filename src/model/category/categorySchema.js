import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", // active or inactive
    },
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      require: true,
      maxLength: 50,
      unique: true,
      index: 1,
      trim: true, // remove space before and after
    },
    parentCatId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
