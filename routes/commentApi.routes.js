const CommentModel = require("../models/Comment.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//API request to get all the comments
router.get("/comments", async(req, res, next) => {
  try {
   const allComments = await CommentModel.find()
   res.json(allComments); 
  } catch (error) {
    console.log(error, "There was a problem with the request for all the comments");
  }
  
});

//API request to get one comment
router.get("/comments/:commentId", async(req, res, next) => {
  const { commentlId } = req.params
  try {
   const oneComment = await CommentModel.findByID(commentlId)
   res.json(oneComment);
  } catch (error) {
    console.log(error, "There was a problem requesting one comment");
  }
  
});

//API request to add a new comment
router.post("/comments/", async(req, res, next) => {
  const newCommentData = req.body
  try {
    const newComment = await CommentModel.create(newCommentData)
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error, "There was a problem with the post request to add a new comment");
  }
});

//API request to uptade a comment
router.put("/tools/:commentId", async(req, res, next) => {
  const { commentId } = req.params
  const updateCommentData = req.body
  try {
    const newComment = await CommentModel.findByIdAndUpdate(commentId, updateCommentData, { new: true })
    res.status(201).json({ message: "Comment was updated"})
  } catch (error) {
    console.log(error, "There was a problem with the put request to update this comment");
  }
});

//API request to delete one comment
router.delete("/comments/:commentId", async(req, res, next) => {
  const { commentId } = req.params
  try {
   await CommentModel.findByIdAndDelete(commentId)
   res.json({message: "Comment was deleted"});
  } catch (error) {
    console.log(error, "There was a problem with the request to delete this comment");
  }
  
});

module.exports = router;
