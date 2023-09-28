const ToolModel = require("../models/Tool.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//API request to get all the tools
router.get("/tools", async(req, res, next) => {
  try {
   const allTools = await ToolModel.find()
   res.json(allTools); 
  } catch (error) {
    console.log(error, "There was a problem with the request for all the tools");
  }
  
});

//API request to get one tool
router.get("/tools/:toolId", async(req, res, next) => {
  const { toolId } = req.params
  try {
   const oneTool = await ToolModel.findByID(toolId)
   res.json(oneTool);
  } catch (error) {
    console.log(error, "There was a problem requesting one tool");
  }
  
});

//API request to add a new tool
router.post("/tools/", async(req, res, next) => {
  const newToolData = req.body
  try {
    const newTool = await ToolModel.create(newToolData)
    res.status(201).json(newTool)
  } catch (error) {
    console.log(error, "There was a problem with the post request to add a new tool");
  }
});

//API request to uptade a tool
router.put("/tools/:toolId", async(req, res, next) => {
  const { toolId } = req.params
  const updateToolData = req.body
  try {
    const newTool = await ToolModel.findByIdAndUpdate(toolId, updateToolData, { new: true })
    res.status(201).json({ message: "Tool was updated"})
  } catch (error) {
    console.log(error, "There was a problem with the put request to update this tool");
  }
});

//API request to delete one tool
router.delete("/tools/:toolId", async(req, res, next) => {
  const { toolId } = req.params
  try {
   await ToolModel.findByIdAndDelete(toolId)
   res.json({message: "Tool was deleted"});
  } catch (error) {
    console.log(error, "There was a problem with the request to delete this tool");
  }
  
});

module.exports = router;
