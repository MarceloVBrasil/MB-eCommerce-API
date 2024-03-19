import fs from "fs"
import { PaymentEfiService } from "../PaymentService/PaymentEfiService/PaymentEfiService"

const {
    TEST_ENVIRONMENT,
    TEST_EFI_CLIENT_ID,
    TEST_EFI_CLIENT_SECRET,
    TEST_EFI_BASE_URL
} = process.env

let paymentEfiService: PaymentEfiService | null = null

export function PaymentEfiFactory() {
    if (!paymentEfiService && TEST_ENVIRONMENT) {
        const certificate = fs.readFileSync('src/services/PaymentService/PaymentEfiService/documents/hom.mbecommerce.p12')
        paymentEfiService
            = new PaymentEfiService(TEST_EFI_CLIENT_ID as string, TEST_EFI_CLIENT_SECRET as string, certificate)
    }

    else if (!paymentEfiService) {
        const certificate = fs.readFileSync('src/services/PaymentService/PaymentEfiService/documents/hom.mbecommerce.p12')
        paymentEfiService
            = new PaymentEfiService(TEST_EFI_CLIENT_ID as string, TEST_EFI_CLIENT_SECRET as string, certificate)
    }

    return paymentEfiService
}