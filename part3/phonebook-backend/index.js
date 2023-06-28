const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const morgan = require('morgan')
const Person = require('./models/person')


// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'))

app.get('/info', (request, response, next) => {
  console.log('info')
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  console.log('index.js line 47');
  Person.find({})
    .then(persons => {
    response.json(persons)
    console.log('request.params.id', response)
    })
    .catch(error => next(error))
  })


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(p => {
    if (p) {
      response.json(p)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('putting');
  const body = request.body

  const note = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})