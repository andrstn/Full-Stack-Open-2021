const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

 app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

app.use(cors())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]

app.get('/info', (request, response) => {
  response.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`)
})
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateID = () => {
  const id = Math.random() * 100000 | 0
  if (persons.find(person => person.id === id) !== undefined) {
    generateID()
  } else {
    return id
  }
}

const addPerson = (name) => {
  return name
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } 
  else if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase()) !== undefined) {
    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const person = {
    name: addPerson(body.name),
    number: body.number,
    id: generateID(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)