import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoute from "./routes/users.js";
import moviesRoute from "./routes/movies.js";
import productsRoute from "./routes/products.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRoute);
app.use("/movies", moviesRoute);
app.use("/products", productsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
