import dotenv from "dotenv"
import cors from "cors"
import express from "express"

dotenv.config()
const app = express();
const { PORT = 8080, SERVER_URL } = process.env;


import { productRoutes } from "./src/routes/productsRoute"
import { authRoutes } from "./src/routes/authRoute"
import { commentRoutes } from "./src/routes/commentsRoute"
import { cartRoutes } from "./src/routes/cartsRoute"
import { purchaseRoutes } from "./src/routes/purchaseRoute"
import { orderRoutes } from "./src/routes/ordersRoute"
import { userRoutes } from "./src/routes/usersRoute"

app.use(express.json());
app.use(cors());

app.use("/images", express.static("public/images"));
app.use("/styles", express.static("public/styles"));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);
app.use("/carts", cartRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
