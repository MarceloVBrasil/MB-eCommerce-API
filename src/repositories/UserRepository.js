class UserRepository {

    constructor() { 
        this._users = [
            {id: "11c6dbf0-b2db-4520-b306-ed7f1534e49b", name: "Marcelo Bra", password: "123", email: "marcelo.vital.brasil@gmail.com"},
            {id: "73ca38a2-9870-458a-8b89-bfb246e22e7d", name: "Admin", password: "123", email: "marcelovitalbrasil92@gmail.com", admin:1},
            {id: "edb2ad26-9479-4aa0-908a-96acb30ed02a", name: "Hugo Vit", password: "123", email: "marcelodvbrasil@icloud.com"},
        ]
    }
    
    getById(id) {
        return this._users.find(user => user.id === id)
    }

    async getByEmail(email) {
        return this._users.find(user => user.email === email)
    }

    async add(user) {        
        this._users.push(user)
        return user
    }

    async update(id, user) {
        const userIndex = this._users.findIndex(user => user.id === id)
        this._users[userIndex] = {...this._users[userIndex], ...user}

        return this._users[userIndex]
    }

    async delete(id) {
        this._users = this._users.filter(user => user.id !== id)
        return id
    }

    async login(email, password) {
        return this._users.find(user => user.email === email && user.password === password)
    }

    async checkExistence(key, value) {
        return this._users.find(user => user[`${key}`] === value)
    }
}

module.exports = { UserRepository }