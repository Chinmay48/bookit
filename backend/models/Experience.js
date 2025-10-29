const mongoose=require('mongoose')

const slotSchema=new mongoose.Schema({
    time:String,
    seatsLeft:Number,
    isSoldOut:{
        type:Boolean,default:false
    }

})

const dateSchema=new mongoose.Schema({
    date:String,
    slots:[slotSchema]
})

const experienceSchema=new mongoose.Schema({
    title:{type:String,required:true},
    location:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    dates:[dateSchema]
})

module.exports=mongoose.model('Experience',experienceSchema)