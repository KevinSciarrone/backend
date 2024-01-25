import express from "express";
import routerProd from "./routes/product.routes";

const PORT = 8080;
const app = express();

apps.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/products`, routerProd);

app.listen(PORT, () => {
  console.log(`server on port: ${PORT}`);
});
