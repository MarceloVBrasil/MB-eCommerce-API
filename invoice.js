const easyInvoice = require("easyinvoice")
require("dotenv").config()

function invoiceData(products, invoiceNumber, today, futureDate) {
    const data = {
        "images": {
            // The logo on top of your invoice
            "logo": `https://cdn.dribbble.com/users/2948332/screenshots/5926397/4.jpg`,
        },
        // Your own data
        "sender": {
            "company": "MB e-Commerce",
            "address": "Street 123",
            "zip": "X0X-0X0",
            "city": "Toronto",
            "country": "Canada"
        },

        "information": {
        // Invoice number
        "number": invoiceNumber,
        // Invoice data
        "date": today,
        // Invoice due date
        "due-date": futureDate
    },

        // The products you would like to see on your invoice
        // Total values are being calculated automatically
        "products": products,
        // The message you would like to display on the bottom of your invoice
        "bottom-notice": "Thank you for the purchase.",
        // Settings to customize your invoice
        "settings": {
            "currency": "USD", 
        },
    };
    return data
}

 function createInvoice(products, invoiceNumber, today, futureDate) {
    return easyInvoice.createInvoice(invoiceData(products, invoiceNumber, today, futureDate))
}

module.exports = { createInvoice };