const mongoose = require('mongoose')
const User = require('../models/user.model')

const faker = require('faker')

mongoose.connect(`mongodb+srv://Diego:yonGo2020@cluster0.s6uo2.mongodb.net/test?authSource=admin&replicaSet=atlas-ma3x94-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, { useNewUrlParser: true, useUnifiedTopology: true })

const userCreator = () => {

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const username = faker.internet.userName(firstName, lastName)
    const email = faker.internet.email(firstName, lastName)
    const password = faker.internet.password()
    const imageUrl = faker.image.avatar()

    return { username, email, password, firstName, lastName, imageUrl }

}

const users = []

const seedLength = 100

for (let i = 0; i < seedLength; i++) {

    users.push(userCreator())
}

User.create(users)
    .then(allUsersCreated => console.log('Se han creado', allUsersCreated.length, 'usuarios en la BBDD'))
    .catch(err => console.log('ERROR: ', err))