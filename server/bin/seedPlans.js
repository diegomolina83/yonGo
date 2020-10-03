const mongoose = require('mongoose')

const Plan = require('../models/plan.model')
const User = require('../models/user.model')

const faker = require('faker')

mongoose.connect(`mongodb+srv://Diego:yonGo2020@cluster0.s6uo2.mongodb.net/test?authSource=admin&replicaSet=atlas-ma3x94-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, { useNewUrlParser: true, useUnifiedTopology: true })

const plansCreator = async (plansAmount) => {

    const plans = []

    await User.find()
        .then(allUsers => {

            for (let i = 0; i < plansAmount; i++) {

                const title = `Plan ${i + 1}`
                const location = {
                    start: {
                        lat: faker.address.latitude(),
                        lng: faker.address.longitude()
                    },
                    end: {
                        lat: faker.address.latitude(),
                        lng: faker.address.longitude()
                    }
                }
                const date = {
                    start: faker.date.soon(),
                    end: faker.date.future()
                }

                const creatorIdx = Math.floor(Math.random() * allUsers.length)
                const creator = allUsers[creatorIdx]

                const owners = [creator]

                const attendees = [creator]
                const minAttendees = 0
                const maxAttendees = 40

                const availableAttendees = []

                // We create an array with all the indexes of the array allUsers
                for (let i = 0; i < allUsers.length; i++) {

                    availableAttendees.push(i)
                }

                // We remove the creator index from the attendees because is already attending
                availableAttendees.splice(creatorIdx, 1)

                // We set the rest of attendees
                const numberOfAttendees = Math.floor(Math.random() * (maxAttendees - minAttendees)) + minAttendees

                // console.log(availableAttendees)

                for (let i = 0; i < numberOfAttendees; i++) {

                    const newAttendeeIndex = availableAttendees[Math.floor(Math.random() * availableAttendees.length)]

                    attendees.push(allUsers[newAttendeeIndex])
                    availableAttendees.splice(availableAttendees.indexOf(newAttendeeIndex), 1)
                }


                // This should be modified in order increase the allowedUsers
                const allowedUsers = attendees

                const mark = {
                    amount: Math.floor(Math.random() * attendees.length),
                    average: Math.random() * 5
                }

                plans.push({ title, location, date, creator, owners, attendees, allowedUsers, mark })
            }
        })
        .catch(err => console.log(err))

    return plans
}

const seedLength = 100

plansCreator(seedLength).then(plans => {

    return Plan.create(plans)
})
    .then(createdPlans => console.log('The following plans were stored into de DB: ', createdPlans))
    .catch(err => console.log('Error: ', err))