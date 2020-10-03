const mongoose = require('mongoose')

// const connectionString = `mongodb://localhost/${process.env.DB_LOCAL}`
const connectionString = `mongodb+srv://Aretius:Sayaton2018@cluster0.s6uo2.mongodb.net/test?authSource=admin&replicaSet=atlas-ma3x94-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose