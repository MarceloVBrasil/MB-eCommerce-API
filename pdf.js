const ejs = require("ejs")
const pdf = require("html-pdf")
const { sendPDF } = require("./mailer")
const { priceTag } = require("./utils/priceTag")

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
             pdf.create(html, {}).toFile("./public/pdf/ejs.pdf", (_err, _res) => {
                 if(_err) console.log(_err)
                 console.log(_res)
             sendPDF("marcelovitalbrasil92@gmail.com", "MB e-Commerce: Sales Receipt",
                 "<h1>You have 1 order!</h1>", "https://mbecommerce.herokuapp.com/pdf/ejs.pdf", `sales-${order.id}.pdf`)
         })
    })
}

module.exports = {generateSalesReceipt}