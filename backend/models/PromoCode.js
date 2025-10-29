const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "flat"], required: true },
  discountValue: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("PromoCode", promoCodeSchema);
