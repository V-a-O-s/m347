const express = require("express") 
const router = express.Router()
const Package = require("../models/packages")
const dotenv = require("dotenv")
const paths = require("path")

dotenv.config(paths.join(__dirname,"../"))


apiKey = process.env.API_KEY
//All Packages
router.get("/:key", apiCheck, async (req,res)=>{

    try {
        const packages = await Package.find()
        res.json(packages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get 1
router.get("/:id/:plz", getPackage, (req,res)=>{
    console.log(res.package)
    res.send(res.package)

})

//Create 1
router.post("/", async (req,res)=>{
    const package = new Package({
        plz: req.body.plz,
        ort: req.body.ort,
        status: req.body.status,
        adresse: req.body.adresse,
        ankunft: req.body.ankunft,
        gewicht: req.body.gewicht
    })
    try {
        const newPackage = await package.save()
        res.status(201).json(newPackage)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Update 1
router.patch("/:id/:plz/:key", getPackage, apiCheck, async (req,res)=>{
    
    if(req.body.plz!=null){
        res.package.plz = req.body.plz
    }
    if(req.body.ort!=null){
        res.package.ort = req.body.ort
    }
    if(req.body.status!=null){
        res.package.status = req.body.status
    }
    if(req.body.adresse!=null){
        res.package.adresse = req.body.adresse
    }

    try {
        const updatedPackage = await res.package.save()
        res.json(updatedPackage)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

//Delete 1
router.delete("/:id/:plz/:key", getPackage, apiCheck, async (req,res)=>{
    try {
        
        await res.package.deleteOne()
        res.json({message:`Deleted Package`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

async function getPackage(req,res,next) {
    let package
    console.log(req.params)
    try { 
       package = await Package.findOne({_id:req.params.id})

        if (package==null || package.plz!=req.params.plz) {
            console.log("err");
            return res.status(404).json({message: "Cannot find Package"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

   
    res.package = package
    next()
}

async function apiCheck(req, res, next) {
    if(req.params.key!=apiKey){
        return res.status(404).json({message:"Invalid API-Key"})
    }
    next()
}

module.exports = router