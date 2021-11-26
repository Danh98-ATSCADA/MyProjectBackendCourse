// // const userList = [
// //     {
// //       id: 1,
// //       name: "iron man",
// //       email: "iron@gmail.com",
// //       password: "123456",
// //       phone: "090909000",
// //       role: "ADMIN",
// //     },
// //     {
// //       id: 2,
// //       name: "spider man",
// //       email: "spider@gmail.com",
// //       password: "123456",
// //       phone: "090909000",
// //       role: "CLIENT",
// //     },
// //   ];

// // const createConfig = function(config){
// //     let finalConfig = Object.assign(
// //             userList[1],config)
// //     return finalConfig
// // }
// // const id = userList.findIndex((item)=>item.id == 3)
// // // console.log(createConfig({
// // //     id:2,
// // //     name:"danh",
// // //     password:"!1111",
// // //     phone:"11111"
// // // }))
// // userList[1] = createConfig({id:2,name:"Danh",phone:"11111"})
// // console.log(userList)
// const arr = [1,2,5,4,9,8]
// console.log(arr.sort())
const image = "abc.jpg"
const arr = image.split('.')
const result = arr[arr.length-1]
console.log(arr[arr.length-1])