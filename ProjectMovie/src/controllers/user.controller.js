const { configEnv } = require("../config");
const {User} = require("../models");
const { userRouter } = require("../routes/user.routes");
const bcriptjs = require("bcryptjs")
const userList = [
    {
      id: 1,
      name: "iron man",
      email: "iron@gmail.com",
      password: "123456",
      phone: "090909000",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "spider man",
      email: "spider@gmail.com",
      password: "123456",
      phone: "090909000",
      role: "CLIENT",
    },
  ];
const findAll = async (req,res)=>{
    try {
        const userList = await User.findAll({
            //attributes:["id","name","email","phone","role","createdAt","updatedAt"]
            attributes:{
                exclude:["password"]
            }
        })
        res.status(200).send(userList)
    } catch (error) {
        res.status(500).send(error)
    }
}

const findDetailUser = async (req,res)=>{
    try {
        const {id} = req.params;
        // const user = userList.find((item)=>item.id==id);
        const detailsUser = await User.findByPk(id)
        
        res.status(200).send(detailsUser)
              
    } catch (error) {
        res.status(500).send(error)
    }

}

const addUser =  async(req,res)=>{
    //  console.log(req.body)
    
    try {
        // const arrId  = []
        // userList.forEach((item)=>{
        //     arrId.push(item.id)
        // })
        // console.log(arrId)
        // const maxId = arrId.reduce((a,b)=>{
        //     return Math.max(a,b)
        // },0)
        // console.log(maxId)
        
        const {name,email, password, phone, role} = req.body;
        const salt = bcriptjs.genSaltSync(10)
        const hashPassword = bcriptjs.hashSync(password, salt)
        // const newUser = {name,email, password, phone, role, id:maxId+1};
        // userList.push(newUser)
        // res.status(201).send(newUser)
        
        // Cach 1    
        // const newUser = User.build({name,email, password, phone, role})
        // await newUser.save()
        // Cach 2
        const newUser = await User.create({name,email, password:hashPassword, phone, role})
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)    
    }
    
 }

// const updateUser = (req,res) =>{
//     try {
//         const {id} = req.params;
//         const idUserUpdate = userList.findIndex((item)=>item.id==id);
//         if(idUserUpdate == -1){
//             res.status(404).send("Don't have this user")
//         }
//         else{
//             userList[id] = configUser(idUserUpdate,req.params)
//             res.status(200).send("Update success")
//         }
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

// const configUser = function(idUser,objParams){
//     let afterConfigUser = Object.assign(userList[idUser],objParams)
//     return afterConfigUser
// }

// const removeUser = (req,res) =>{
//     try {
//         const {id} = req.params;
//         const idUserUpdate = userList.findIndex((item)=>item.id==id);
//         if(idUserUpdate == -1){
//             res.status(404).send("Don't have this user")
//         }
//         else{
//             userList.splice(idUserUpdate,1)
//             res.status(200).send("Remove success")
//         }   
//     } catch (error) {
//         res.status(500).send(error)
//     }

// }

const updateUser = async (req,res) => {
    try {
        const {id} = req.params;
        console.log(21)
        const {name,password,phone, role} = req.body
        await User.update({name,password,phone, role},{
            where:{
                id,// id:id
            }
        })
        const detailsUser = await User.findByPk(id)
        res.status(200).send(detailsUser)
    }catch{

    }
}

const removeUser = async (req,res) => {
    const user = req.user
    try{
        const {id} = req.params;
        const detailsUser = await User.findByPk(id);
        await User.destroy({
            where:{
                id
            }
        })
        res.status(200).send(detailsUser)
    }
    catch (error){
        res.status(500).send(error)
    }
}

const uploadAvatar = async (req,res) =>{
    const {user, file} = req;
    const urlImage =  configEnv.server.host + file.path;
    const userUploadAvatar  = await User.findByPk(user.id);
    userUploadAvatar.avatar = "link hinh";
    await userUploadAvatar.save();
    res.send(user)
}

module.exports={
    findAll, findDetailUser, addUser, updateUser, removeUser, uploadAvatar
}
