import { EmailService } from "../EmailService";
import { PdfService } from "../PdfService";

const { TEST_ENVIRONMENT } = process.env

let emailService: EmailService | null = null

export function EmailFactory() {
    if (!emailService && TEST_ENVIRONMENT) {
        emailService = new EmailService(new PdfService())
    }

    else if (!emailService) {
        emailService = new EmailService(new PdfService())
    }

    return emailService
}