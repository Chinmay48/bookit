const Booking=require('../models/Booking')

const Experience=require('../models/Experience')
const {v4:uuidv4}=require('uuid')

const createBooking=async(req,res)=>{
    try {
        const{experienceId,name,email,date,time,quantity}=req.body
           console.log(time)
        if(!experienceId || !name || !email || !date || !time){
            return res.status(400).json({ message: "All fields are required" });
        }

        const experience=await Experience.findById(experienceId)

        if(!experience){
            return res.status(404).json({ message: "Experience not found" });
        }

         const selectedDate = experience.dates.find((d) => d.date === date);
    if (!selectedDate) {
      return res.status(400).json({ message: "Invalid date selected" });
    }

        const selectedSlot = selectedDate.slots.find((s) => s.time === time);
      
    if (!selectedSlot) {
      return res.status(400).json({ message: "Slot not available" });
    }

        selectedSlot.seatsLeft-=quantity
        if(selectedSlot.seatsLeft<=0){
            selectedSlot.isSoldOut=true
        }
           if (selectedSlot.seatsLeft < quantity) {
      return res.status(400).json({ message: "Not enough seats left" });
    }

        await experience.save()
        
        const subtotal=experience.price*quantity
        const tax=Math.round(subtotal*0.06)
        const totalAmount=subtotal+tax

        const booking=new Booking({
            experience:experienceId,name,email,date,time,quantity,totalAmount,bookingRef:uuidv4().split("-")[0]
        })

        await booking.save()

        res.status(201).json({
            message: "Booking confirmed",
      bookingRef: booking.bookingRef,
      totalAmount,
      booking,
        })


    } catch (error) {
         res.status(500).json({ message: "Error creating booking", error });
         console.log(error)
    }
}

module.exports={createBooking}