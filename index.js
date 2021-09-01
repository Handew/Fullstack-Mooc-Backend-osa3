require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-5323523"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendick",
//         number: "39-23-6423122"
//     }
// ]

morgan.token('body', function getBody (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res),
        
    ].join(' ')
  }))

app.get('/info', (req, res) => {
    let people = persons.length
    let date = new Date()
    res.send(`<p>Phonebook has info for ${people} people</p>
    ${date}`)
})

// *** HAETAAN KAIKKI HENKILÖT ***
app.get('/api/persons', (req, res) => {
    Phonebook.find({}).then(persons => {
        res.json(persons)
    })
})

// *** HAETAAN YKSI HENKILÖ ***
app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then(person => {
        res.json(person)
    })
})

// const randomId = (max) => {
//     return Math.floor(Math.random() * max)
// }

// *** LUODAAN UUSI HENKILÖ ***
app.post('/api/persons', (req, res) => {
    const body = req.body   

    if (body.name === undefined) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (body.number === undefined) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    // if (persons.find(p => p.name === body.name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

// *** POISTETAAN HENKILÖ ***
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
