import express from "express";
import { sendBookingEmail } from "../email";

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

  // try {
  //   await sendBookingEmail({
  //     name,
  //     surname,
  //     phone,
  //     email,
  //     date,
  //     time,
  //     people,
  //   });

  //   res.status(201).json({
  //     message: "Booking request received",
  //   });
  // } catch (error) {
  //   console.error("Booking email error:", error);

  //   res.status(500).json({
  //     error: "Could not send booking request.",
  //   });
  // }
});

export default router;