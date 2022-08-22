const app = require('./app')

const port = process.env.PORT
console.log(port)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) 

// const multer = require('multer')
// const upload = multer ({
//     dest:'images',
//     limits: {
//         fileSize: 1000000,

//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
//             return cb(new Error('File must be in pdf or doc format'))
//         }
//         // cb(new Error('File must be a pdf'))
//         cb(undefined, true)
//         // cb(undefined,true)
//     }cd
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

// learning middleware


// app.use((req,res,next) => {
//     if (req.method == 'GET') {
//         res.send('Get request disabled')
//     } else {
//         next()
//     }
// })

// app.use((req,res,next) =>{
//     res.status(503).send('This site is under maintenance. Try back later.')
// })




// const main = async (req,res) => {
//     // to retrieve te creator of a task 
//     // const task = await Task.findById('62ca2cb49ea5e6232872da4e')
//     // await task.populate('creator').execPopulate()
//     // console.log(task.creator)

//     // to retrieve tasks created by a user
//     const user = await User.findById('62cc11bd9ccd9e2a186fdbc6')
//     //await user.populate('tasks').execPopulate()
//     //console.log(user.tasks)
// }

// main()
// const pet ={
//     'name': 'Ajike'
// }
// console.log(pet)
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id:'abc123'}, 'randomcharacters', {expiresIn:'7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'randomcharacters')
//     console.log(data)
// }
// myFunction()



// Hashing passwords


// const bcrypt = require ('bcryptjs')

// const myFunction = async () => {
//     const password = 'Rick213'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)


//     const isMatch = await bcrypt.compare('Rick213', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('From my other router')
// })
// app.use(router)


// app.post('/users', async (req, res) => {
//     const user = new User(req.body)
//     try{
//         await user.save()
//         res.status(200).send(user)

//     } catch(e) {
//         res.status(400).send(e)
//     }
//     await user.save()

//     // console.log(req.body)
//     // res.send('testing')

//     // user.save().then(() => {
//     //     res.status(201).send(user)
//     // }).catch((error) => {
//     //     res.status(400)
//     //     res.send(error)
//     //     //or res.status(400).send(error)
//     // })
// })

// app.get('/users', async (req,res) => {

//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch(e) {
//         res.status(500).send()
//     }
// //     User.find({}).then((users) => {
// //         res.status(201).send(users)
// //     }).catch((error) => {
// //         res.status(500).send()
// //     })
// })

// app.get('/users/:id', async (req,res) => {
//     //console.log(_id)
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if (!user) {
//             return (res.status(404).send())
//         }
//         res.send(user)
//     }catch(e) {
//         res.status(500).send(e)
//     }

//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return (res.status(404).send())
//     //     }

//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })
// app.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'age', 'password']
//     const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

//     if (isValidUpdate===false) {
//         return res.status(400).send(`error: update can't be done`)
//     }
//         try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body ,{new: true , runValidators: true})
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)

//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e) {
//         res.status(500).send
//     }
// })






// app.post('/tasks', (req,res) => {
//     const task = new Task(req.body)
    
//     task.save().then(() => {
//         res.status(201).send(task)

//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })

// app.get('/tasks', (req , res) => {
//     Task.find({}).then((tasks) => {
//         res.status(200).send(tasks)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// app.get('/tasks/:id', (req , res) => {
//     Task.findById(req.params.id).then((task) => {
//         if (!task) {
//             return (res.status(404).send())
//         }
//         res.status(200).send(task)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })



// app.patch('/tasks/:id', async (req, res) => {
//     const desiredUpdate = Object.keys(req.body)
//     const authUpdates = ['description','completed']
//     const isValid= desiredUpdate.every((updt) => {
//         return authUpdates.includes(updt)
// })
//     if (isValid===false) {
//         return res.status(400).send('You can\'t do this update')
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new: true, runValidators:true})

//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }
//      catch (e) {
//         res.status(404).send(e)
//     }
// })

// app.delete('/tasks/:id' , async (req, res) => {
//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch(e) { 
//         res.send(e)
//     }
// })
