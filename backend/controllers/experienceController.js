const Experience=require('../models/Experience')

const getAllExperiences=async(req,res)=>{
    try {
        const experiences=await Experience.find();
        res.status(200).json(experiences)
    } catch (error) {
        res.status(500).json({message:"Error fetching experiences",error})
    }
    
}


const getExperienceById=async(req,res)=>{
    try {
        const experience=await Experience.findById(req.params.id)
        if(!experience) return res.status(404).json({message:"Experience not found"})
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({message:"Error fetching experience details"})
    }
}

module.exports={getAllExperiences,getExperienceById}