// //CRUD
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Using destructuring to access properties of mongodb
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL =  process.env.MONGODB_URL
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id)
// // console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('62c164bdfdc7f11720dec07e')
    }, {
        $set :{
            name: 'Tunde'
        }
    })
    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // or

    db.collection('users').updateOne({
        _id: new ObjectID('62c164bdfdc7f11720dec07e')
    }, {
        $set :{
            name: 'Tunde'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    // db.collection('users').findOne({name: 'Mo',age:2}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find the user')
    //     }
    //     console.log(user)

    // })
    // db.collection('users').findOne({_id: new ObjectID("62c17318fad5a52bccb8683e")}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find the user')
    //     }
    //     console.log(user)

    // })



    // db.collection('users').find({name: 'Idrees'}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({name: 'Idrees'}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID('62c16eb18552130348b0dd35')}, (error,task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed:false}).toArray((error, task) => {
    //     console.log(task)
    // })




    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Ben',
    //     age: 21
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.')
    //     }

    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Tunde',
    //         age: 28
    //     },{
    //         name: 'Mo',
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Have a 30 minutes workout',
    //         completed: true
    //     },{
    //         description: 'Read a book',
    //         completed: false
    //     },{
    //         description: 'Hit himup',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })
})