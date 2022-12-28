const apiInstance = require("./sendInBlueApiInstance");
const { createInvoice } = require("./invoice")

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

async function sendReceipt(email, products, invoiceNumber, today, futureDate, recipient) {
  const formattedProducts = products.map(product => {
    return {
      "description": product.name,
      "price": product.price,
      "quantity": product.quantity,
      "tax-rate": 0
    }
  })
  const invoice = await createInvoice(formattedProducts, invoiceNumber, today, futureDate)
  return sendEmail({
    email,
    subject: `MB e-Commerce Receipt`,
    htmlContent: `<h1>Thanks for purchasing</h1> <p>Dear ${recipient}, please find attached your invoice</p>`,
    attachment: [
      {
        content: invoice.pdf,
        name: "invoice.pdf"
      }
      ]
  });
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

module.exports = {sendReceipt, sendPDF}