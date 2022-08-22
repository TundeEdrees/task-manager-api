const User = require ('../models/user')
const express = require('express')
const router = new express.Router()
const auth = require ('../middleware/auth')
const multer = require ('multer')
const {sendWelcomeEmail, sendGoodByeEmail} = require('../emails/accounts')

// router.get('/test', (req, res) => {
//     res.send('From new user file')
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        console.log(user)
        const token = await user.generateAuthToken()
        //sendWelcomeEmail(user.email, user.name)
        await user.save()
        res.status(200).send({user,token})

    } catch(e) {
        res.status(400).send(e.message)
    }

    // console.log(req.body)
    // res.send('testing')

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400)
    //     res.send(error)
    //     //or res.status(400).send(error)
    // })
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
        //res.send({user: user.getPublicProfile(), token})

    } catch(e){
        // console.log(e.message)
        res.status(400).send('Login unsuccessful')
    }
})


// This route takes away the token that was used to create/login the user
// req.user and req.token are from auth.js
//req.user makes it possible to work with a single authenticated user, more like a customer.
router.post('/users/logout', auth, async(req, res) => {
    try {
        // console.log(req.user)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('Logged out')
    } catch (e) {
        res.status(500).send()
    }
})

// This router empties the tokens array. Thereby logging out the user everywhere
router.post('/users/logoutAll', auth , async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// This route is not very reasonable as authenticating gives one acces to details of other users, pretty much unuseable.
// Check the next route for the correct one ( which gives only the documents whose access has been authenticated)
router.get('/users', auth, async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
//     User.find({}).then((users) => {
//         res.status(201).send(users)
//     }).catch((error) => {
//         res.status(500).send()
//     })
})

// Ignore the preceding route
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// The route below is unreasonable too yeah?
router.get('/users/:id', async (req,res) => {
    //console.log(_id)
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if (!user) {
            return (res.status(404).send())
        }
        res.send(user)
    }catch(e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return (res.status(404).send())
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// updating without authentication

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'age', 'password']
//     const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

//     if (isValidUpdate===false) {
//         return res.status(400).send(`error: update can't be done`)
//     }
//     try {

//         // to make middleware work
//         const user = await User.findByIdAndUpdate(req.params.id, req.body)

//         updates.forEach((update) => user[update] = req.body[update])

//         await user.save()
        
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body ,{new: true , runValidators: true})
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)

//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

// updating with authentication
// req.user is from auth.js, once again.
router.patch('/users/meup', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (isValidUpdate===false) {
        return res.status(400).send(`error: update can't be done`)
    }
    try {

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        res.send(req.user)
        
    } catch (e) {
        res.status(500).send(e)
    }
})

// delete without authentication
// router.delete('/users/:id', async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e) {
//         res.status(500).send(e)
//     }
// })


// delete with authentication
router.delete('/users/me', auth, async (req, res) => {
    try{
        //sendGoodByeEmail(user.email, user.name)
        await req.user.remove()
        res.status(200).send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

const upload = multer ({
    limits: {
        fileSize:1000000,
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be in jpg, jpeg or png format.'))
        }
        cb(undefined, true)

    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('users/:id/avatar', async(req,res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router