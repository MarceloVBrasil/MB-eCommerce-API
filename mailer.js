const apiInstance = require("./sendInBlueApiInstance");

function sendEmail({ email, ...options }) {
  const sender = {
    name: "MB e-Commerce",
    email: "noreply@mbecommerce.ca",
  };
  apiInstance.post("/smtp/email", {
    sender,
    replyTo: sender,
    to: [{ email }],
    ...options,
  });
}

function sendOrderEmail(orderId, recipient, email) {
  return sendEmail({
    email,
    subject: `MB e-Commerce order on its way!`,
    htmlContent: `<h1>Out for Delivery!</h1> <p>Dear ${recipient}, your order ${orderId} is on its way!</p>`
  })
}

function sendPDF(email, subject, htmlContent, pdfContent, pdfName) {
  return sendEmail({
    email,
    subject,
    htmlContent,
    attachment: [
      {content: pdfContent, name: pdfName}
    ]
  })  
}

module.exports = { sendPDF, sendOrderEmail }