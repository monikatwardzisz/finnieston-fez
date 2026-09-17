import express from "express";
import { sendBookingEmail } from "../email";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, surname, date, time, people } = req.body;

  if (!name || !surname || !date || !time || !people) {
    return res.status(400).json({
      error: "Please provide all booking details.",
    });
  }

  try {
    await sendBookingEmail({
      name,
      surname,
      date,
      time,
      people,
    });

    res.status(201).json({
      message: "Booking confirmed",
    });
  } catch (error) {
    console.error("Booking email error:", error);

    res.status(500).json({
      error: "Could not send booking email.",
    });
  }
});

export default router;