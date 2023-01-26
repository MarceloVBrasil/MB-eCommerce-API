require("dotenv").config()

const { SERVER_URL } = process.env

class ProductRepository {
    constructor() {
        this._products = [
            {
                id: 'f41e4377-d911-4c8a-8c04-54a948357417', 
                name: 'MacBook Pro 16"',
                description:
                "10-Core CPU\n16-Core GPU\n16GB Unified Memory\n1TB SSD Storage",
                price: 4650,
                quantity: 100,
                image: `${SERVER_URL}/images/macBookPro16.png`,
                brand_id: '8d544607-eef2-4c80-a264-b7a66d588b78',
                category_id: '9d0b0267-a6c4-4411-aec7-551d1bb237ba',
            },
            {
                id: '2d7a8df3-5e15-4713-b37b-bbd1a6854b7f', 
                name: "Led Monitor",
                description: 'Samsung Led Monitor 27" \n FreeSync',
                price: 299,
                quantity: 100,
                image: `${SERVER_URL}/images/ledMonitorSamsung27.webp`,
                brand_id: '0146c766-a6ea-4d8c-96ab-83b8619316eb',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
            {
                id: '7f622530-bd23-4f75-8d96-a91c75befcf5', 
                name: "Wireless Mouse",
                description:
                "Logitech M325 Wireless Mouse \n2.4GHz with USB Unifying Receiver",
                price: 19,
                quantity: 100,
                image: `${SERVER_URL}/images/wirelessMouse.png`,
                brand_id: '7d1ac90c-3aa6-4dc9-b863-6672ff45599d',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
            {
                id: 'd21a3b07-037f-496e-80dd-bb90b63fd952', 
                name: "Dell Precision 3000 Workstation",
                description: 'Dell 15.6" laptop \n512GB HDD \n64GB RAM\n3.5 GHz Core i7',
                price: 350,
                quantity: 100,
                image: `${SERVER_URL}/images/dellComputer.png`,
                brand_id: 'd6761bac-8d20-4e0c-93da-0a2832bb31b5',
                category_id: '9d0b0267-a6c4-4411-aec7-551d1bb237ba',
            },
            {
                id: 'ddd63f63-9d12-4649-9066-4e77f2c10ee1', 
                name: "Gaming Chair",
                description: 'Ergonomic Office Chair\nHigh Back\nExcellent for Back Pain',
                price: 249,
                quantity: 100,
                image: `${SERVER_URL}/images/gamingChair.png`,
                brand_id: '405ac18a-c54f-4f61-a807-55ce148db05d',
                category_id: '1567b4cf-fb56-445c-aa9a-47e6e1458860',
            },
            {
                id: 'bc6055d0-27cf-4f07-995c-7ee68235a272', 
                name: "Headphones",
                description: 'Sony BASS Noise Cancelling\nWireless Bluetooth Headset\nAlexa Voice Control',
                price: 70,
                quantity: 100,
                image: `${SERVER_URL}/images/headphones.png`,
                brand_id: 'f1dbf7d2-f93d-40bf-b292-610aadf3af98',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
            {
                id: 'e6a69530-f946-49b8-b0c3-942cf4c9c2e8', 
                name: "MousePad",
                description: 'Cloth Mouse Pad High-Performance\n Optimized for Gaming Sensors',
                price: 14,
                quantity: 100,
                image: `${SERVER_URL}/images/mousepad.png`,
                brand_id: '8572c25e-7fa2-4aa2-a0c8-98ee26fcd8b7',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
            {
                id: '94419a08-b4fd-4820-9188-3f0487fad420', 
                name: "SSD",
                description: 'Samsung 870 EVO 1TB SATA 2.5" Internal SSD',
                price: 129,
                quantity: 100,
                image: `${SERVER_URL}/images/ssd.png`,
                brand_id: '0146c766-a6ea-4d8c-96ab-83b8619316eb',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
                
            {
                id: '28ea8daf-8e7c-41a6-b404-75619b4e4973', 
                name: "HDMI Cable",
                description: 'HDMI Cable 3.3 Feet\n4K HDMI Cable',
                price: 10,
                quantity: 100,
                image: `${SERVER_URL}/images/hdmi.png`,
                brand_id: '560b8381-da72-4500-aa22-f18ecd90f648',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
            {
                id: '5ef62239-b393-4e33-8410-71ca107bdffc', 
                name: "Ultra-Wide Monitor",
                description: '49" Widescreen Versatility\nAMD FreeSync 2\nVESA Display HDR 400',
                price: 670,
                quantity: 100,
                image: `${SERVER_URL}/images/monitor.png`,
                brand_id:  'f0d019f5-a1d8-4a3a-bf8f-664db848e9ce',
                category_id: '077e21e3-e37b-4353-bc8a-cedada17aea3',
            },
        ]
    }

    getAll() {
        return this._products
    }

    getById(id) {
        return this._products.find(product => product.id === id)
    }

    add(product) {
        this._products.push(product)
        return product
    }

    update(id, product) {
        const productIndex = this._products.findIndex(product => product.id === id)
        this._products[productIndex] = {id, ...product}
        return {id, ...product}
    }

    delete(id) {
        this._products.filter(product => product.id !== id)
        return id
    }

    checkExistence(key, value) {
        return this._products.find(product => product[`${key}`] === value)
    }
}

module.exports = { ProductRepository }