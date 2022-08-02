const request = require('supertest')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
const app =  require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setUpDatabase} = require('./fixtures/db')

// beforeEach(async() => {
//     await User.deleteMany()
//     await new User(userOne).save( )
// })

beforeEach(setUpDatabase)

test('Signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Idrees',
        email: 'Hedreeddaaddsss@sample.com',
        password: 'Pass12366'
    }).expect(200)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    // The below works for on e property

    // expect(response.body.user.name).toBe('Idrees')

    //This works for series of properties
    expect(response.body).toMatchObject({
        user: {
            name: 'Idrees',
            email: 'Hedreeddaaddsss@sample.com'.toLowerCase()
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Pass12366')
})

test('Login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Not login user', async() => {
    await request(app).post('/users/login').send({
        email: 'dgd@debugg.com',
        password: 'sdjdjd'
    }).expect(400)
})

test('Get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // 
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete without authenticating', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


test('Upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    // Note that in Javascript, objects are not equal to one another (toBe uses === operator). This is why the below line of code won't run
    //expect({}).toBe({})

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Update valid user fields', async () => {
    await request(app)
        .patch('/users/meup')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({name: 'Tunde'})
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Tunde')
})

test('Not upload invalid user fields', async () => {
    await request(app)
        .patch('/users/meup')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({sibSP: '4'})
        .expect(400)
})