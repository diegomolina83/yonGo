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

                const title = `Plan ${i}`

                const hasEnd = Math.floor(Math.random() * 2)

                const passedPlansPercentage = 10    // In %
                const isPassed = Math.floor(Math.random() * (100 / passedPlansPercentage)) === 0 ? true : false

                // // All around the world
                // const randomStartLatitude = faker.address.latitude()
                // const randomStartLongitude = faker.address.longitude()

                // const randomEndLatitude = faker.address.latitude()
                // const randomEndLongitude = faker.address.longitude()

                // // Within Spain
                // const minLatitude = 36.134919
                // const maxLatitude = 43.326108
                // const minLongitude = -8.648822
                // const maxLongitude = 2.195764



                // Within Madrid
                const minLatitude = 40.307528
                const maxLatitude = 40.496922
                const minLongitude = -3.843728
                const maxLongitude = -3.560117

                const randomStartLatitude = Math.random() * (maxLatitude - minLatitude) + minLatitude
                const randomEndLatitude = Math.random() * (maxLatitude - minLatitude) + minLatitude
                const randomStartLongitude = Math.random() * (maxLongitude - minLongitude) + minLongitude
                const randomEndLongitude = Math.random() * (maxLongitude - minLongitude) + minLongitude

                const startDate = isPassed ? faker.date.past() : faker.date.soon()
                const endDate = isPassed ? faker.date.recent() : faker.date.future()

                const start = {

                    location: {
                        lat: randomStartLatitude.toString(),
                        lng: randomStartLongitude.toString()
                    },
                    date: startDate
                }

                const end = {

                    location: {
                        lat: randomEndLatitude.toString(),
                        lng: randomEndLongitude.toString()
                    },
                    date: endDate
                }

                let creatorIdx

                if (i > 100) {

                    creatorIdx = 0
                } else if (i > 200) {

                    creatorIdx = 1
                } else {

                    creatorIdx = Math.floor(Math.random() * allUsers.length)
                }

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

                for (let i = 0; i < numberOfAttendees; i++) {

                    const newAttendeeIndex = availableAttendees[Math.floor(Math.random() * availableAttendees.length)]

                    attendees.push(allUsers[newAttendeeIndex])
                    availableAttendees.splice(availableAttendees.indexOf(newAttendeeIndex), 1)
                }


                // This should be modified in order increase the allowedUsers (TODO)
                const allowedUsers = attendees

                // Random category
                const availableCategories = ['sport', 'culinary', 'culture', 'travel', 'other']
                const category = availableCategories[Math.floor(Math.random() * availableCategories.length)]

                const mark = {
                    amount: Math.floor(Math.random() * attendees.length),
                    average: Math.random() * 5
                }

                // Random image
                const imageUrl = faker.image.city()

                const newPlan = hasEnd ?
                    { title, start, end, creator, owners, attendees, allowedUsers, mark, category, imageUrl } :
                    { title, start, creator, owners, attendees, allowedUsers, mark, category, imageUrl }

                plans.push(newPlan)
            }
        })
        .catch(err => console.log(err))

    return plans
}

const seedLength = 1000

plansCreator(seedLength)
    .then(plans => Plan.create(plans))
    .then(createdPlans => console.log('The following plans were stored into de DB: ', createdPlans))
    .catch(err => console.log('Error: ', err))