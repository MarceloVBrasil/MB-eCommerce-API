class AddressRepository {
    constructor() {
        this._addresses = [
            {id: "1a26a2f5-d976-47c6-9fea-d20d18aaf5cc", street: "123 St", city: "Sim City", province: "AC", postalCode: "A0A-0A0", complement: "", user_id: "11c6dbf0-b2db-4520-b306-ed7f1534e49b"},
            {id: "9d7bc01e-439a-4722-b0d1-0bb46e1adc96", street: "Neo Avenue", city: "Atlanta", province: "AP", postalCode: "A1A-1A1", complement: "", user_id: "73ca38a2-9870-458a-8b89-bfb246e22e7d"},
            {id: "edd9d4ab-75c1-4ae9-a00c-199422e5c3d6", street: "Sim", city: "Gotham", province: "AM", postalCode: "A2A-2A2", complement: "", user_id: "edb2ad26-9479-4aa0-908a-96acb30ed02a"},
        ]
    }

    async getByUserId(userId) {
        return this._addresses.find(address => address.user_id === userId)
    }

    async add(address) {
        this._addresses.push(address)
        return address
    }

    async update(userId, address) {
        const addressIndex = this._addresses.findIndex(address => address.user_id === userId)
        this._addresses[addressIndex] = {...address, user_id: userId}
        return address
    }

    async delete(userId) {
        this._addresses = this._addresses.filter(address => address.user_id !== userId)
        return userId
    }
}

module.exports = { AddressRepository }