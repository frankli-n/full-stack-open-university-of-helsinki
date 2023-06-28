const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('name and number required as arguments')
  process.exit(1)
}

const password = process.argv[2]
const argName = process.argv[3]
const argNumb = process.argv[4]

const url =
  `mongodb+srv://fullstackhelsinki:${password}@clusterfullstackhelsink.o7rl4py.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)


const person = new Person({
  name: argName,
  number: argNumb,
})

if (process.argv.length === 3) {
  console.log('Phonebook');
  Person.find({}).then((i) => {
    i.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })}

if (process.argv.length === 5) {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}




