const apiInstance = require("../../sendInBlueApiInstance");
const ejs = require("ejs")
const pdf = require("html-pdf")
const { priceTag } = require("../utils/priceTag")
const { calculateTotal } = require("../utils/calculateTotalAmount")
const { formatProductsData } = require("../utils/formatProductsData")

class EmailService {
    constructor() {}

    static sendPurchaseReceipt(client, order) {
        const total = calculateTotal(order.products)
      const products = formatProductsData(order.products)
    
         ejs.renderFile("./templates/purchaseReceipt.ejs",
             {
                 name: "MB e-Commerce",
                 complement: "Unit 10",
                 city: "Toronto",
                 street: "123 Street",
                 province: "ON",
                 postalCode: "A0A-0A0",
                 orderId: order.id,
                 date: order.order_date,
                 products: products,
                total: priceTag(total)
        },
             (_err, html) => {
                 pdf.create(html, {childProcessOptions: {env: {OPENSSL_CONF: '/dev/null',}}}).toBuffer((_err, buffer) => {
                    const pdfBase64 = buffer.toString('base64')
                    this._attachPDF(client.email, "MB e-Commerce Receipt",
                        `<h1>Thanks for purchasing</h1> <p>Dear ${client.name}, please find attached your invoice</p>`,
                        pdfBase64,
                        `MBe-CommerceInvoice.pdf`)
             })
        })
    }

    static sendSalesReceipt(client, order) {
        const total = calculateTotal(order.products)
        const products = formatProductsData(order.products)
    
         ejs.renderFile("./templates/salesReceipt.ejs",
             {
                 name: client.name,
                 complement: client.complement || "N/A",
                 city: client.city,
                 street: client.street,
                 province: client.province,
                 postalCode: client.postalCode,
                 orderId: order.id,
                 date: order.order_date,
                 products: products,
                total: priceTag(total)
        },
             (_err, html) => {
                 pdf.create(html, {childProcessOptions: {env: {OPENSSL_CONF: '/dev/null',}}}).toBuffer((_err, buffer) => {
                     const pdfBase64 = buffer.toString('base64')
    
                     this._attachPDF("marcelovitalbrasil92@gmail.com", "MB e-Commerce Receipt",
                         `<h1>You have 1 order!</h1>`,
                         pdfBase64,
                         `MBe-CommerceSalesReceipt.pdf`)
             })
        })
    }

    static sendOrderEmail(orderId, recipient, email) {
      return this._sendEmail({
        email,
        subject: `MB e-Commerce order on its way!`,
        htmlContent: `<h1>Out for Delivery!</h1> <p>Dear ${recipient}, your order ${orderId} is on its way!</p>`
      })
    }

    static _sendEmail({ email, ...options }) {
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
      
      static _attachPDF(email, subject, htmlContent, pdfContent, pdfName) {
        return this._sendEmail({
          email,
          subject,
          htmlContent,
          attachment: [
            {content: pdfContent, name: pdfName}
          ]
        })  
      }
}

module.exports = { EmailService }