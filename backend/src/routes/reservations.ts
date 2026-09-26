import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    surname,
    phone,
    email,
    date,
    time,
    people,
  } = req.body;

  if (!name || !surname || !phone || !email || !date || !time || !people) {
    return res.status(400).json({
      error: "Please provide all booking details.",
    });
  }

  // Email temporarily disabled while testing
  // await sendBookingEmail({
  //   name,
  //   surname,
  //   phone,
  //   email,
  //   date,
  //   time,
  //   people,
  // });

  res.status(201).json({
    message: "Booking request received",
  });
});

export default router;