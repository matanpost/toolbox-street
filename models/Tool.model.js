const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const toolsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: []
    },
    description: {
      type: String,
      required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const ToolModel = model("Tool", toolsSchema);

module.exports = ToolModel;
