const {Router} =  require("express");
const {findAll, findDetailUser, addUser, updateUser, removeUser, uploadAvatar} = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth/verify-token.middleware");
const userRouter = Router();
const {checkExist} = require("../middlewares/validations/check-exist.middleware")
const {User} = require("../models")
const {uploadImageSingle} = require("../middlewares/upload/upload-images-middlewares")

userRouter.get("/",[],findAll)
userRouter.get("/:id",[checkExist(User)],findDetailUser)
userRouter.post("/",addUser)
userRouter.put("/:id",[checkExist(User)],updateUser)
userRouter.delete("/:id",
    authenticate,
    authorize,
    checkExist(User),removeUser)

//
userRouter.post("/upload-avatar",uploadImageSingle(),uploadAvatar)


module.exports = {
    userRouter
};