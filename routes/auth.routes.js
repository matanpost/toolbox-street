const router = require("express").Router();
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const { isAuthenticated } = require("../middlewares/jwt.middleware");


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Signup
router.post("/signup", async(req, res, next) => {
    const payload = req.body
    // Hash password
const salt = bcrypt.genSaltSync(13)
const hashedPassword = bcrypt.hashSync(payload.password, salt)
    // Creat the user
try {
    await UserModel.create({username: payload.username, email: payload.email,  passwordHash: hashedPassword})

    res.status(201).send({ message: "User was created successfully" })
} catch (error) {
    console.log(error, "There was an problem creating the user");
}
     
})

// Login
router.post("/login", async (req, res, next) => {
try {
    //Finding the existing user
 const matchedUsers = await UserModel.find({ username: req.body.
 username })
 if (matchedUsers.length) {
    const currentUser = matchedUsers[0]
    
    //Checking the password
    if (bcrypt.compareSync(req.body.password, currentUser.passwordHash)) {
        // Generating the JWT
        const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {user: {username: currentUser.username }}
        }, 
        process.env.TOKEN_SECRET
        )
        res.json({ token })
    } else {
        res.status(403).json({ message: "Password is incorrect" })
        return 
    }


 } else {
    res.status(404).json({ message: "User was not found" })
 } 
} catch (error) {
    console.log(error, "There was an error with the login request");
}
})

// Verifyx  
router.post("/verify",isAuthenticated ,(req, res, next) => {
    if (req.payload) {
        res.json(req.payload.data.user)
    } else {
        res.json({ message: "There is no authentication" })
    }
})


module.exports = router;