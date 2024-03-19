import { Agent } from "https"
import { INamedProductInCart } from "../../../../repositories/interfaces/view models/INamedProductInCart"
import { IUser } from "../../../../models/User"

function getCertificateCredentials(certificate: Buffer) {
    return new Agent({ pfx: certificate, passphrase: "" })
}

function getApplicationCredentials(username: string, password: String) {
    return Buffer.from(`${username}:${password}`).toString('base64')
}

function getBolixData(productsInCart: INamedProductInCart[], user: IUser) {
    const items = formatProductsInCart(productsInCart)
    const customer = getCustomerNameAndCpf(user)
    const currentDate = getCurrentDate()

    return { items, payment: { banking_billet: { customer, expire_at: currentDate } } }
}

function formatProductsInCart(productsInCart: INamedProductInCart[]) {
    return productsInCart.map(productInCart => { return { name: productInCart.name, amount: productInCart.quantity, value: productInCart.unitPrice } })
}

function getCustomerNameAndCpf(customer: IUser) {
    const cpf = getCpfNumbersOnly('014.177.207-78')
    return { name: customer.name, cpf }
}

function getCpfNumbersOnly(cpf: string) {
    return cpf.replaceAll('.', '').replaceAll('-', '')
}

function getCurrentDate() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
    const day = new Date().getDate()

    return `${year}-${month}-${day}`
}

export { getCertificateCredentials, getApplicationCredentials, getBolixData }