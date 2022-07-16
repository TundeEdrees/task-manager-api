const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model('User',{
//     name:{
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim:true,
//         lowercase:true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default:0,
//         validate(value){
//             if (value<0){
//                 throw new Error('Age must be positive')
//             }
//         }
//     },
//     password:{
//         required:true,
//         type: String,
//         trim:true,
//         validate(value){
//             if (value.length<=6 || value.toLowerCase().includes('password')) {
//                 throw new Error(`Oops!. Your password must have more than 6 characters and must not include 'password'.`)
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Ibra ',
//     email: 'Lion@gmail.com',
//     password: ' Hedrees6754 '
// })
// me.save().then((me) => [
//     console.log(me)
// ]).catch((error) => {
//     console.log('Error' ,error)
// })

// const Task = mongoose.model('Task',{
//     description: {
//         required: true,
//         type: String,
//         trim: true,
//     },
//     completed: {
//         default:false,
//         type: Boolean
//     }
// })

// const task = new Task({
//     description: 'Complete mongoose',
//     completed: 'false'
// })
// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })
