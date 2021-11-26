const { User } = require("../models")
const bcriptjs = require("bcryptjs");
const user = require("../models/user");
const jwt  = require("jsonwebtoken")

const signUp = async (req, res) => {
    /**
     * Các bước tạo password
     * 1. Tạo chuỗi ngẫu nhiên bằng hàm bcript
     * 2. kết hợp: chuỗi ngẫu nhiên + password => hash
     */

    try {
        const { name, email, password, phone } = req.body;
        const salt = bcriptjs.genSaltSync(10)
        const hashPassword = bcriptjs.hashSync(password, salt)
        const newUser = await User.create({ name, email, password: hashPassword, phone })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send(error)
    }

}

const signIn = async (req, res) => {
    /**
     * 2 buoc dang nhap
     * 1/ tim user theo email
     * 2/ so sanh password
     */
    try{
        const{email,password} = req.body
        const userLogin = await User.findOne({
            where:{
                email,
            },
        })
        if(userLogin){
            // so sanh password
            const isAuth = bcriptjs.compareSync(password,userLogin.password)
            if(isAuth){
                /**
                 * Tao json web token
                 */
                const payload = {
                    id: userLogin.id,
                    email: userLogin.email,
                    role: userLogin.role
                }
                const secretKey = "haoPN"
                const token = jwt.sign(payload,secretKey)
                res.status(200).send({
                    messages:"Dang nhap thanh cong",
                    token
                })
            }
            else{
                res.status(400).send({
                    messages:"Password khong chinh xac"
                })
            }
        }
        else{
            res.status(404).send({
                messages: "Email khong chinh xac"
            })
        }
    }
    catch(error){
        res.status(500).send(error)
    }
}

const resetPassword = async(req,res) =>{
    try{
        const {email} = req.body
        const passwordDefault = "abcdef"
        const userDetail = await User.findOne({
            where:{
                email,
            }
        })
        if(userDetail){
            const salt = bcriptjs.genSaltSync(10)
            const hashPassword = bcriptjs.hashSync(passwordDefault, salt)
            userDetail.password = hashPassword
            await userDetail.save()

            res.status(200).send({
                messages:"Reset password thanh con",
                newPassword: passwordDefault
            })

        }
        else{
            res.status(404).send({
                messages:"Email ko chinh xac"
            })
        }
    }
    catch(error){

    }
}
module.exports = {
    signIn, signUp, resetPassword
}