const express = require("express");
const dotenv = require("dotenv")
const app = express();
const {rootUser, rootRouter} = require("./src/routes/root.routes")
const path = require("path")

dotenv.config()
//set up dang body json
app.use(express.json())

// set up static file 
const pathPublicDirectory = path.join(__dirname,"./public")

// để link url truy cập tới public, giống như response của upload image
app.use("/public",express.static(pathPublicDirectory))
// const port = 7000;
const port = process.env.PORT
console.log(port)
app.post("/hello",(req,res) => {
    res.send("Xin chao node js22")
})

//  /**
//   * lay danh sach user
//   * url:http://localhost:7000/users
//   * method:get
//   */
// app.get("/users",
// (req,res,next)=>{
//     console.log("Success");
//     next()
// },
// (req,res)=>{
//     try {
//         res.status(200).send(userList)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })



//  /**
//   * lay thog tin chi tiet user
//   * url:http://localhost:7000/users/1
//   * method:get
//   */
// app.get("/users/:id",(req,res)=>{
//     try {
//         const {id} = req.params;
//         const user = userList.find((item)=>item.id==id);
//         if(user){
//             res.status(200).send(user)
//         }
//         else{
//             res.status(404).send("Id not found")
//         }        
//     } catch (error) {
//         res.status(500).send(error)
//     }

// })

//  /**
//   * thêm  user
//   * url:http://localhost:7000/users
//   * method:post
//   * data:{...}
//   */
//  app.post("/users",
//  (req,res,next) => {
//     const {name} = req.body;
//     if(name.length >= 3 && name.length<=100){
//         next();
//     }else{
//         res.status(400).send({message:"Do dai ten ko hop le"})
//     }
//  },
//  (req,res)=>{
//     //  console.log(req.body)
    
//     try {
//         const arrId  = []
//         userList.forEach((item)=>{
//             arrId.push(item.id)
//         })
//         console.log(arrId)
//         const maxId = arrId.reduce((a,b)=>{
//             return Math.max(a,b)
//         },0)
//         console.log(maxId)
//         const {name,email, password, phone, role} = req.body;
//         const newUser = {name,email, password, phone, role, id:maxId+1};
//         userList.push(newUser)

//         res.status(201).send(newUser)    
//     } catch (error) {
//         res.status(500).send(error)    
//     }
    
//  })


//   /**
//   * cập nhật người dùng
//   * url:http://localhost:7000/users/1
//   * method:put/patch(patch cập nhật 1 trường dữ liệu)
//   * data:{...}
//   */

//    /**
//   * xóa user
//   * url:http://localhost:7000/users/1
//   * method:delete
//   */

// app.delete("/users/:id",(req,res)=>{
//     try {
//         const {id} = req.params;
//         const idUser = userList.findIndex((item)=>item.id==id);
//         if(user){
//             userList.splice(idUser,1)
//             res.status(200).send("delete success")
//         }
//         else{
//             res.status(404).send("Id not found")
//         }        
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })




// http://localhost:7000/api/v1
app.use("/api/v1",rootRouter)
app.listen(port,()=>{
    console.log(`app run on port ${port}`);
})


