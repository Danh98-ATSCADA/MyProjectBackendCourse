const {Router} =  require("express");
const {userRouter} = require("./user.routes") 
const { authRouter} = require("./auth.routers")
const rootRouter = Router();

rootRouter.use("/users",userRouter)

//http://localhost:7000/api/v1/auth
rootRouter.use("/auth",authRouter)
module.exports = {
    rootRouter
};