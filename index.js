const express = require("express");
const ProductsManager = require("./productManager");

const app = express();
const port = 3001;

const productManager = new ProductsManager("ruta_del_archivo.json");

// Endpoint para obtener todos los productos con límite opcional

app.get("/", (req, res) => {
  res.end("hola mundo");
});

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 3) : undefined;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ error: `No existe ningún producto con el ID ${productId}.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
