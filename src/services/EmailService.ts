import * as nodemailer from "nodemailer"
import emailConfig from "./helpers/EmailHelper"
import { PdfService } from "./PdfService"
import { IUser } from "../models/User"
import { IOrder } from "../models/Order"
import { IAddress } from "../models/Address"
import { INamedProductInCart } from "../repositories/interfaces/view models/INamedProductInCart"

interface IMailOptions {
    from: { name: string, address: string }
    to: string
    subject: string
    html?: string
    text?: string
    attachments?: IFile[]
}

interface IFile {
    filename: string
    content?: string
    encoding?: "base64"
}

export class EmailService {
    constructor(private pdfService: PdfService) { }

    async sendPurchaseReceipt(user: IUser, order: IOrder, productsInCart: INamedProductInCart[]) {
        const purchaseReceiptPdf = await this.pdfService.generatePurchaseReceipt(user, order, productsInCart)
        await this.sendMailWithAttachment('marcelo.vital.brasil@gmail.com',
            'MB e-Commerce Purchase Receipt',
            'thanks for purchasing!', purchaseReceiptPdf)
    }

    async sendSalesReceipt(user: IUser, address: IAddress, order: IOrder, productsInCart: INamedProductInCart[]) {
        const salesReceiptPdf = await this.pdfService.generateSalesReceipt(user, address, order, productsInCart)
        await this.sendMailWithAttachment('marcelo.vital.brasil@gmail.com',
            'MB e-Commerce Sales Receipt', 'You have a new order!', salesReceiptPdf)
    }

    async sendBolix(linkToBolix: string) {
        await this.sendMailWithoutAttachment('marcelo.vital.brasil@gmail.com',
            'MB e-Commerce Bolix',
            `download your bolix! ${linkToBolix}`, '')
    }

    private async sendMailWithoutAttachment(to: string, subject: string, message: string, attachement: string) {
        const mailOptions: IMailOptions = {
            from: { name: 'MB e-Commerce', address: 'marcelo.vital.brasil@gmail.com' },
            to: to,
            subject: subject,
            html: message,
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: { user: emailConfig.user, pass: emailConfig.password },
            tls: { rejectUnauthorized: true }
        })

        await transporter.sendMail(mailOptions)
    }

    private async sendMailWithAttachment(to: string, subject: string, message: string, attachement: string) {
        const mailOptions: IMailOptions = {
            from: { name: 'MB e-Commerce', address: 'marcelo.vital.brasil@gmail.com' },
            to: to,
            subject: subject,
            html: message,
            attachments: [
                {
                    filename: 'purchaseReceipt.pdf',
                    content: attachement,
                    encoding: 'base64'
                }
            ]
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: { user: emailConfig.user, pass: emailConfig.password },
            tls: { rejectUnauthorized: true }
        })

        await transporter.sendMail(mailOptions)
    }
}