require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { PORT = 8080, SERVER_URL } = process.env;

const productsRoutes = require("./src/routes/productsRoute");
const registerRoutes = require("./src/routes/registerRoute");
const loginRoutes = require("./src/routes/loginRoute");
const commentsRoutes = require("./src/routes/commentsRoute");
const cartsRoutes = require("./src/routes/cartsRoute");
const purchaseRoutes = require("./src/routes/purchaseRoute");
const ordersRoutes = require('./src/routes/ordersRoute')
const usersRoutes = require('./src/routes/usersRoute')

app.use(express.json());
app.use(cors());

app.use("/images", express.static("./public/images"));
app.use("/styles", express.static("./public/styles"));

app.use("/products", productsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/comments", commentsRoutes);
app.use("/carts", cartsRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
