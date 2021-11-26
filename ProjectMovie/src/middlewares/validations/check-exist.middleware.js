const {User} = require("../../models")

const checkExist = (Model) => async (req,res,next) =>{
    try{
        const {id} = req.params
        const detail = await Model.findOne({
            where: {
                id,
            }
        })
        console.log(detail)

        if(detail){
            next()
        }
        else{
            res.status(404).send({
                messages:"Id not exist"
            });
        }
    }
    catch(error){
        res.status(500).send(error)
    }
}
module.exports = {checkExist}