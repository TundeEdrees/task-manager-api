const Task = require ('../models/task')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


//req.user is from auth.js as usual.

router.post('/tasks', auth, async (req,res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        creator: req.user._id
    })
    
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)

    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req , res) => {

    // for filtering
    const matchh = {}
    const sortt = {}

    if (req.query.completed) {
        matchh.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sortt[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{

        // This could be either directly or by using execPopulate function. Both are shown below
//1
        // const tasks = await Task.find({creator: req.user._id})
//2
        await req.user.populate({
            path: 'tasks',
            match: matchh,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sortt
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async(req , res) => {
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id,creator:req.user._id})
        if (!task) {
            return (res.status(404).send())
        }
        res.status(200).send(task)
    }

    catch(e) {
        res.status(500).send()
    }
})

//
router.patch('/tasks/:id', auth, async (req, res) => {
    const desiredUpdate = Object.keys(req.body)
    const authUpdates = ['description','completed']
    const isValid= desiredUpdate.every((updt) => {
        return authUpdates.includes(updt)
})
    if (isValid===false) {
        return res.status(400).send('You can\'t do this update')
    }
    try {

        // to make middleware work
        const task = await Task.findOne({_id: req.params.id, creator: req.user._id})


        if (!task) {
            return res.status(404).send()
        }
        desiredUpdate.forEach((updt) => task[updt] = req.body[updt])

        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new: true, runValidators:true})
        res.send(task)
    }
     catch (e) {
        res.status(404).send(e)
    }
})

router.delete('/tasks/:id' , auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({creator:req.user._id,_id:req.params.id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) { 
        res.send(e)
    }
})

module.exports=router