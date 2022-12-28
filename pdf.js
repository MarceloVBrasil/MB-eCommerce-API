const ejs = require("ejs")
const pdf = require("html-pdf")
const { sendPDF } = require("./mailer")
const { priceTag } = require("./utils/priceTag")
const pdf2Base64 = require("pdf-to-base64")

function generateSalesReceipt(client, order) {
    const total = order.products.reduce((total, product) => total + product.total, 0)
    const products = order.products.map(product => {
        return {
            name: product.name,
            price: priceTag(product.price),
            quantity: product.quantity,
            total: priceTag(product.total)
        }
    })

     ejs.renderFile("./templates/salesReceipt.ejs",
         {
             name: client.name,
             complement: client.complement || "N/A",
             city: client.city,
             street: client.street,
             province: client.province,
             postalCode: client.postalCode,
             orderId: order.orderId,
             date: order.date,
             products: products,
            total: priceTag(total)
    },
         (_err, html) => {
             console.log("antes do pdf")
            if(_err) console.log(_err)
             pdf.create(html, {}).toBuffer((_err, buffer) => {
                 console.log("depois do buffer")
                 if (_err) return console.log(_err)
                 const pdfBase64 = buffer.toString('base64')
                 console.log(pdfBase64)
                 sendPDF("marcelovitalbrasil92@gmail.com", "MB e-Commerce Receipt",
                     `<h1>You have 1 order!</h1>`,
                     pdfBase64,
                     `MBe-CommerceSalesReceipt.pdf`)
         })
    })
}

function generatePurchaseReceipt(client, order) {
    const total = order.products.reduce((total, product) => total + product.total, 0)
    const products = order.products.map(product => {
        return {
            name: product.name,
            price: priceTag(product.price),
            quantity: product.quantity,
            total: priceTag(product.total)
        }
    })

     ejs.renderFile("./templates/purchaseReceipt.ejs",
         {
             name: "MB e-Commerce",
             complement: "Unit 10",
             city: "Toronto",
             street: "123 Street",
             province: "ON",
             postalCode: "A0A-0A0",
             orderId: order.orderId,
             date: order.date,
             products: products,
            total: priceTag(total)
    },
         (_err, html) => {
             pdf.create(html, {}).toBuffer((_err, buffer) => {
                 if(_err) return console.log(_err)
                const pdfBase64 = buffer.toString('base64')
                sendPDF(client.email, "MB e-Commerce Receipt",
                    `<h1>Thanks for purchasing</h1> <p>Dear ${client.name}, please find attached your invoice</p>`,
                    pdfBase64,
                    `MBe-CommerceInvoice.pdf`)
         })
    })
}

module.exports = { generateSalesReceipt, generatePurchaseReceipt }