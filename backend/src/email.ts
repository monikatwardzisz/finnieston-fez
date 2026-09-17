import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendOrderEmail(order: {
  id: number;
  customerName: string;
  phone: string;
  collectionTime: string;
  notes: string | null;
  total: number;
  items: {
    quantity: number;
    price: number;
    menuItem: {
      name: string;
    };
  }[];
}) {
  const itemsHtml = order.items
    .map(
      (item) => `
        <li>
          ${item.quantity} × ${item.menuItem.name}
          — £${(item.price * item.quantity).toFixed(2)}
        </li>
      `,
    )
    .join("");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: ` New Collection Order #${order.id}`,
    html: `
      <h1> New Collection Order #${order.id}</h1>

      <h2>Customer</h2>

      <p>
        <strong>Name:</strong> ${order.customerName}<br>
        <strong>Phone:</strong> ${order.phone}<br>
        <strong>Collection:</strong> ${order.collectionTime}
      </p>

      <h2>Order</h2>

      <ul>
        ${itemsHtml}
      </ul>

      <h2>Total: £${order.total.toFixed(2)}</h2>

      <p>
        <strong>Payment:</strong> Pay at collection
      </p>

      ${
        order.notes
          ? `
            <h2>Notes</h2>
            <p>${order.notes}</p>
          `
          : ""
      }

      <hr>

      <p>Finnieston Fez Collection Order</p>
    `,
  });




}

export async function sendBookingEmail(booking: {
  name: string;
  surname: string;
  date: string;
  time: string;
  people: number;
}) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ORDER_EMAIL,
    subject: "New Table Booking",
    html: `
      <h2>New Table Booking</h2>

      <p><strong>Name:</strong> ${booking.name} ${booking.surname}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
      <p><strong>Number of people:</strong> ${booking.people}</p>
    `,
  });
}