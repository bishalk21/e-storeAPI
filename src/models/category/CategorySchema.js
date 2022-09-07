import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive", //active, inactive
    },
    name: {
      type: String,
      require: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      index: 1,
      maxLength: 50,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", catSchema);
