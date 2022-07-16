const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true,
    useCreateIndex: true
})

const taskSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String,
        trim: true,
    },
    completed: {
        default:false,
        type: Boolean
    },
    creator : {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
})
const Task = mongoose.model('Task',taskSchema)



// const task = new Task({
//     description: 'Complete mongoose',
//     completed: 'false'
// })
// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })



// If Schema were to be used
// const taskSchema = new mongoose.Schema({
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

// const Task = mongoose.model('Task',taskSchema)

module.exports = Task