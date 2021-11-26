const multer = require("multer")
const { getExtensionFile } = require("../../utils/get-extension-file")

const uploadImageSingle = (typeImage)=>{
    const storage = multer.diskStorage({
        destination:(req,res,callback) =>{
            callback(null,`./public/images/${typeImage}`)
        }, // Duong dan thu muc de luu file
        filename: (req,file,callback) => {
            callback(null, Date.now()+"_"+file.originalname)
        }, // ten file gui len
    })
    const upload = multer({storage, fileFilter:(req,file,callback) =>{
        const extensionImageList = ["png","jpg","jpeg","gif","webp"];
        const extensionFile = getExtensionFile(file.originalname)
        console.log(extensionFile)
        if(extensionImageList.includes(extensionFile)){
            callback(null,true);
        }else{
            callback(new Error("extension ko hop le"))
        }
    }});
    return  upload.single(typeImage)
}
module.exports = {uploadImageSingle,}

// function callback(err,result){
//     if(err) throw new Error(err);
//     return result
// }