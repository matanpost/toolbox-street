const isAdmin = (req, res, next) => {
    if (req.payload.data.user.role == "admin"){
        next()
    }
    res.status(403).json({ message: "Not an admin" })
}

module.exports = {isAdmin}