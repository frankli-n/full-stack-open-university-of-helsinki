const mongoose = require('mongoose')



// const password = 'hWnizo7BZHKm4BdZ'
// const url =
//   `mongodb+srv://fullstackhelsinki:${password}@clusterfullstackhelsink.o7rl4py.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 9,
    validate: {
      validator: function (value) {
        return /^(\d{2,3}-\d+)$/.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

module.exports = mongoose.model('Person', personSchema)
