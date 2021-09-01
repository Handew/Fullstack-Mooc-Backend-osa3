const mongoose = require('mongoose')

if ( process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://Handew:${password}@cluster0.91jfz.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if ( process.argv.length==5) {
    let nimi = process.argv[3]
    let numero = process.argv[4]
    const phonebook = new Phonebook({
        name: nimi,
        number: numero,
    })

    phonebook.save().then(response => {
        console.log(`added ${nimi} number ${numero} to phonebook`)
        mongoose.connection.close()
    }) 
}

if ( process.argv.length == 3){
    Phonebook.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phonebook => {
            console.log(phonebook.name, phonebook.number)
        })
        mongoose.connection.close()
    })
}

