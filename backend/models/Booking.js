const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
    experience:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Experience",
        required:true
    },
    name:{type:String,required:true},
    email:{type:String,required:true},
    date:{type:String,required:true},
     time: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number, required: true },
  bookingRef: { type: String, required: true, unique: true },
  status: { type: String, default: "confirmed" },
  createdAt: { type: Date, default: Date.now },
})

module.exports=mongoose.model("Booking",bookingSchema)