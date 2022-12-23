require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { PORT = 8080, SERVER_URL } = process.env;
const productsRoutes = require("./routes/productsRoute");
const registerRoutes = require("./routes/registerRoute");
const loginRoutes = require("./routes/loginRoute");
const commentsRoutes = require("./routes/commentsRoute");
const cartsRoutes = require("./routes/cartsRoute");
const purchaseRoutes = require("./routes/purchaseRoute");
const ordersRoutes = require('./routes/ordersRoute')
const usersRoutes = require('./routes/usersRoute')

app.use(express.json());
app.use(cors());
app.use("/images", express.static("./public/images"));
app.use("/products", productsRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/comments", commentsRoutes);
app.use("/carts", cartsRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
