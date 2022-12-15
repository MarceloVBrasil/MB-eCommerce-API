/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

require("dotenv").config();
const { SERVER_URL } = process.env;

const products = [
  {
    name: 'MacBook Pro 16"',
    description:
      "10-Core CPU\n16-Core GPU\n16GB Unified Memory\n1TB SSD Storage",
    price: 4650,
    quantity: 100,
    image: `${SERVER_URL}/images/macBookPro16.png`,
    brand_id: 1,
    category_id: 1,
  },
  {
    name: "Led Monitor",
    description: 'Samsung Led Monitor 27" \n FreeSync',
    price: 299,
    quantity: 100,
    image: `${SERVER_URL}/images/ledMonitorSamsung27.webp`,
    brand_id: 3,
    category_id: 2,
  },
  {
    name: "Wireless Mouse",
    description:
      "Logitech M325 Wireless Mouse \n2.4GHz with USB Unifying Receiver",
    price: 19,
    quantity: 100,
    image: `${SERVER_URL}/images/wirelessMonitorLogitechM325.png`,
    brand_id: 4,
    category_id: 2,
  },
  {
    name: "Dell Precision 3000 Workstation Laptop",
    description: 'Dell 15.6" laptop \n512GB HDD \n64GB RAM\n3.5 GHz Core i7',
    price: 350,
    quantity: 100,
    image: `${SERVER_URL}/images/dellPrecision3000Workstation.png`,
    brand_id: 2,
    category_id: 1,
  },
  {
    name: "Gaming Chair",
    description: 'Ergonomic Office Chair\nHigh Back\nExcellent for Back Pain',
    price: 249,
    quantity: 100,
    image: `${SERVER_URL}/images/gamingChair.png`,
    brand_id: 5,
    category_id: 3,
  },
  {
    name: "Headphones",
    description: 'Sony BASS Noise Cancelling\nWireless Bluetooth Headset\nAlexa Voice Control',
    price: 70,
    quantity: 100,
    image: `${SERVER_URL}/images/headphones.png`,
    brand_id: 6,
    category_id: 2,
  },
  {
    name: "MousePad",
    description: 'Cloth Mouse Pad High-Performance\n Optimized for Gaming Sensors',
    price: 14,
    quantity: 100,
    image: `${SERVER_URL}/images/mousepad.png`,
    brand_id: 7,
    category_id: 2,
  },
  {
    name: "SSD",
    description: 'Samsung 870 EVO 1TB SATA 2.5" Internal SSD',
    price: 129,
    quantity: 100,
    image: `${SERVER_URL}/images/ssd.png`,
    brand_id: 3,
    category_id: 2,
  },
    
  {
    name: "HDMI Cable",
    description: 'HDMI Cable 3.3 Feet\n4K HDMI Cable',
    price: 10,
    quantity: 100,
    image: `${SERVER_URL}/images/hdmi.png`,
    brand_id: 8,
    category_id: 2,
  },
  {
    name: "Ultra-Wide Monitor",
    description: '49" Widescreen Versatility\nAMD FreeSync 2\nVESA Display HDR 400',
    price: 670,
    quantity: 100,
    image: `${SERVER_URL}/images/monitor.png`,
    brand_id: 9,
    category_id: 2,
  },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("product").del();
  await knex("product").insert(products);
};
