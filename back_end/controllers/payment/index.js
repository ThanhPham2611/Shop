const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const paymentMethod = async (req, res) => {
  try {
    const line_items = req.body?.cartItems?.map((item) => {
      return {
        price_data: {
          currency: "VND",
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.title,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: 10000,
        },
        quantity: item.amount,
      };
    });
    console.log(line_items);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      line_items,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};
