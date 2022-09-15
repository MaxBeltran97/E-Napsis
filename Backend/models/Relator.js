const { Schema, model } = require('mongoose');

const RelatorSchema = Schema({

    firstName: {
        type: String,
        required: true

    },
    lastName: {
        type: String,
        required: true
    },
    nationality: {
        type: String
        
    },
    rut: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellPhone: {
        type: Number,
        required: true
    },
    homePhone: {
        type: Number
    },
    officePhone: {
        type: Number 
    },
    birthday: {
        type: Date
    },
    profession: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String
        
    },
    adress: {
        type: String,

    },
    region: {
        type: String

    },
    comuna: {
        type: String

    },
    condition: {
        type: Boolean

    },
    contract: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    bankAccountNumber: {
        type: Number,
        required: true
    },
    bankAccount: {
        type: String,
        required: true
    },
    reuf: {
        type: Boolean

    },
    acredited: {
        type: Boolean

    },
    acreditationProcess: {
        type: Boolean
    }

});

module.exports = model('Relator', RelatorSchema );