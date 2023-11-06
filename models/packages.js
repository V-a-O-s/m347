const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    plz: {
        type: String,
        required: true,
        //default: "Unbekannt"
    },
    ort:{
        type: String,
        required: true,
        //default: "Unbekannt"
    },
    status: {
        type: String,
        required: true,
        default: "In Bearbeitung"

        /*
            "In Bearbeitung"
            "In Zustellung"
            "Zugestellt"
        //*/
    },
    adresse: {
        type: String,
        required: true,
        //default: "Unbekannt"
        
    },
    ankunft: {
        type: Date,
        required: true,
        default: Date.now
    },
    gewicht: {
        type: String,
        required: true,
        default: "Unbekannt"
    },
    
})

module.exports = mongoose.model("Package",packageSchema)

/*







*/