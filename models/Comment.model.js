const { Schema, model } = require ("mongoose");

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content is required.']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
  timestamps: true  
}
);

const CommentModel = model("Comment", commentSchema);

module.exports = CommentModel;