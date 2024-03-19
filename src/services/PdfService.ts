import { Liquid } from "liquidjs"
import puppeteer from "puppeteer"
import { IUser } from "../models/User"
import { IOrder } from "../models/Order"
import { IAddress } from "../models/Address"
import { INamedProductInCart } from "../repositories/interfaces/view models/INamedProductInCart"

export class PdfService {
    private engine = new Liquid({ root: ['templates/', 'public/styles'], extname: '.liquid' })
    constructor() { }

    async generatePurchaseReceipt(user: IUser, order: IOrder, productsInCart: INamedProductInCart[]) {
        const purchaseReceiptHTML = await this.renderPurchaseReceipt(user, order, productsInCart)

        return this.convertHtmlIntoPdf(purchaseReceiptHTML, `purchaseReceipts/pr-${order.id}`)
    }

    async generateSalesReceipt(user: IUser, address: IAddress, order: IOrder, productsinCart: INamedProductInCart[]) {
        const salesReceiptHTML = await this.renderSalesReceipt(user, address, order, productsinCart)

        return this.convertHtmlIntoPdf(salesReceiptHTML, `salesReceipts/sr-${order.id}`)
    }

    private async renderPurchaseReceipt(user: IUser, order: IOrder, productsInCart: INamedProductInCart[]) {
        return await this.engine.renderFile("purchaseReceipt", {
            name: "MB e-Commerce",
            complement: "Unit 10",
            city: "Toronto",
            street: "123 Street",
            province: "ON",
            postalCode: "A0A-0A0",
            orderId: order.id,
            date: order.date,
            products: productsInCart,
            total: order.total
        })
    }

    private async renderSalesReceipt(user: IUser, address: IAddress, order: IOrder, productsInCart: INamedProductInCart[]) {
        return await this.engine.renderFile("salesReceipt", {
            name: user.name,
            complement: address.complement || "N/A",
            city: address.city,
            street: address.street,
            province: address.province,
            postalCode: address.postalCode,
            orderId: order.id,
            date: order.date,
            products: productsInCart,
            total: order.total
        })
    }

    private async convertHtmlIntoPdf(html: string, path: string) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf({ path: `src/documents/receipts/${path}.pdf`, format: 'A4' });
        await browser.close();

        const pdf = pdfBuffer.toString('base64')

        return pdf
    }
}