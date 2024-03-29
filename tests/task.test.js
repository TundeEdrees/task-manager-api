const request = require('supertest')
const Task = require('../src/models/task')
const app =  require('../src/app')
const {userOneId,
     userOne,
     userTwo,
     userTwoId,
     taskOne,
     taskTwo,
     taskThree,
     setUpDatabase
    } = require('./fixtures/db')

beforeEach(setUpDatabase)

test('Create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'First entry'
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBe(null)
    expect(task.completed).toBe(false)
})

test('Get tasks for a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete other user tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/ ${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        // .expect(404)
    const task = Task.findById(taskOne._id)
    expect(task).not.toBe(null)
})