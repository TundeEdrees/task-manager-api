const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')
const Task = require('./task')

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true,
    useCreateIndex: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Provide a valid email')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if (value<0){
                throw new Error('Age must be positive')
            }
        }
    },
    password:{
        required:true,
        type: String,
        trim:true,
        validate(value){
            if (value.length<=6 || value.toLowerCase().includes('password')) {
                throw new Error(`Oops!. Your password must have more than 6 characters and must not include 'password'.`)
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token:{
            type: String,
            required:true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'creator'
})

// userSchema.methods.getPublicProfile = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token:token})
    await user.save()
    return token
    
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email:email})
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error ('Unable to login')
    }
    return user
}

//Hashing the plain-text password before saving

userSchema.pre('save', async function (next) {
    var user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({creator: user._id})

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User