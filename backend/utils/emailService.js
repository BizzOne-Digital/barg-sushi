const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const send = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
};

exports.sendOrderConfirmation = async ({ email, name, order }) => {
  const itemsHtml = order.items
    .map((i) => `<tr><td>${i.name}</td><td>x${i.quantity}</td><td>$${(i.price * i.quantity).toFixed(2)}</td></tr>`)
    .join("");

  await send({
    to: email,
    subject: `Order Confirmed — ${order.orderNumber} | Barg Sushi Bar & Grill`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1a1a1a;padding:30px;text-align:center;">
          <h1 style="color:#c9a84c;margin:0;">BARG</h1>
          <p style="color:#fff;margin:4px 0;">Sushi Bar & Grill</p>
        </div>
        <div style="padding:30px;">
          <h2>Order Confirmed!</h2>
          <p>Hello <strong>${name}</strong>, your order has been received.</p>
          <p><strong>Order #:</strong> ${order.orderNumber}</p>
          <p><strong>Type:</strong> ${order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}</p>
          ${order.scheduledFor ? `<p><strong>Scheduled For:</strong> ${new Date(order.scheduledFor).toLocaleString("en-CA")}</p>` : ""}
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <thead><tr style="background:#f5f5f5;"><th style="padding:8px;text-align:left;">Item</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
          ${order.deliveryFee > 0 ? `<p><strong>Delivery:</strong> $${order.deliveryFee.toFixed(2)}</p>` : ""}
          <p style="font-size:1.2em;"><strong>Total: $${order.total.toFixed(2)}</strong></p>
          <hr/>
          <p style="color:#888;font-size:0.9em;">Thank you for choosing Barg Sushi Bar & Grill!</p>
        </div>
      </div>
    `,
  });
};

exports.sendReservationConfirmation = async (reservation) => {
  await send({
    to: reservation.email,
    subject: `Reservation Received — ${reservation.confirmationCode} | Barg Sushi`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1a1a1a;padding:30px;text-align:center;">
          <h1 style="color:#c9a84c;margin:0;">BARG</h1>
          <p style="color:#fff;margin:4px 0;">Sushi Bar & Grill</p>
        </div>
        <div style="padding:30px;">
          <h2>Reservation Request Received</h2>
          <p>Hello <strong>${reservation.name}</strong>,</p>
          <p>Your reservation request has been received. We will confirm shortly.</p>
          <p><strong>Confirmation Code:</strong> ${reservation.confirmationCode}</p>
          <p><strong>Date:</strong> ${new Date(reservation.date).toLocaleDateString("en-CA")}</p>
          <p><strong>Time:</strong> ${reservation.time}</p>
          <p><strong>Party Size:</strong> ${reservation.partySize}</p>
          ${reservation.occasion ? `<p><strong>Occasion:</strong> ${reservation.occasion}</p>` : ""}
          ${reservation.specialRequests ? `<p><strong>Special Requests:</strong> ${reservation.specialRequests}</p>` : ""}
          <hr/>
          <p style="color:#888;font-size:0.9em;">We look forward to welcoming you. If you need to cancel, please contact us directly.</p>
        </div>
      </div>
    `,
  });
};

exports.sendContactMessage = async ({ name, email, phone, message }) => {
  await send({
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${name} | Barg Sushi`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  });
};
