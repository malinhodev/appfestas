const mongoose = require('mongoose')

const PartySchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true
    },
    descripition: {
        type: String       
    },
    partyDate: {
        type: Date        
    },
    photos: {
        type: Array
    },
    privacy: {
        type: Boolean
    },
    userId: {
        type: mongoose.ObjectId
    }
})

const Party = mongoose.model('Party', PartySchema)

module.exports = Party