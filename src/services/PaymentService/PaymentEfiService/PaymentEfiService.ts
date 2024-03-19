import axios from "axios"
import { getApplicationCredentials, getBolixData, getCertificateCredentials } from "./helper/EfiHelper"
import { INamedProductInCart } from "../../../repositories/interfaces/view models/INamedProductInCart"
import { IUser } from "../../../models/User"

export class PaymentEfiService {
    constructor(
        private username: string,
        private password: string,
        private certificate: Buffer,
    ) { }

    async authenticatePix(baseUrl: string = 'https://pix-h.api.efipay.com.br') {
        const certificateCredentials = getCertificateCredentials(this.certificate)
        const applicationCredentials = getApplicationCredentials(this.username, this.password)

        return await axios.post(baseUrl + '/oauth/token', { grant_type: 'client_credentials' },
            { headers: { Authorization: `Basic ${applicationCredentials}` }, httpsAgent: certificateCredentials })
    }

    async authenticateBolix(baseUrl: string = 'https://cobrancas-h.api.efipay.com.br') {
        const applicationCredentials = getApplicationCredentials(this.username, this.password)

        return await axios.post(baseUrl + '/v1/authorize', { grant_type: 'client_credentials' },
            { headers: { Authorization: `Basic ${applicationCredentials}` } })
    }

    async createBolix(productsInCart: INamedProductInCart[], user: IUser, baseUrl: string = 'https://cobrancas-h.api.efipay.com.br') {
        try {
            const authenticationResponse = await this.authenticateBolix()
            const { access_token } = authenticationResponse.data

            const data = getBolixData(productsInCart, user)

            return await axios.post(baseUrl + '/v1/charge/one-step', data,
                { headers: { Authorization: `Bearer ${access_token}`, "Content-Type": 'application/json' } })
        } catch (error: any) {
            console.log(error.response.data)
            throw new Error('failed to create bolix')
        }
    }
}