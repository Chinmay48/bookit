const validatePromo = async (req, res) => {
  try {
    const { code, amount } = req.body;
    if (!code || !amount) {
      return res.status(400).json({ valid: false, message: "Code and amount required" });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase(), isActive: true });

    if (!promo) {
      return res.status(404).json({ valid: false, message: "Invalid promo code" });
    }

    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = (amount * promo.discountValue) / 100;
    } else if (promo.discountType === "flat") {
      discount = promo.discountValue;
    }

    const finalAmount = Math.max(amount - discount, 0);

    res.status(200).json({
      valid: true,
      message: "Promo code applied",
      discount: Number(discount),
      finalAmount: Number(finalAmount),
    });
  } catch (error) {
    res.status(500).json({ valid: false, message: "Error validating promo code", error });
  }
};


module.exports={validatePromo}