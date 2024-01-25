import { Router } from "express";
import { ProductsManager } from "../productManager/productManager";

const productManager = new ProductsManager(`./products.json`);

const routerProd = Router;

routerProd.get(`/`, async (req, res) => {
  const { limit } = req.query;
  const prods = await productManager.getProducts();
  const products = prods.slice(0, limit);
  res.status(200).send(products);
});

routerProd.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const prods = await productManager.getProductsById(id);
  if (prods) {
    res.status(200).send(prod);
  } else {
    res.status(404).send("Producto no encontrado.");
  }
});

routerProd.post(`/`, async (req, res) => {
  const conf = await productManager.addProduct(req.body);
  if (conf) {
    res.status(201).send("Producto creado");
  } else {
    res.status(400).send("El producto ya existe.");
  }
});

routerProd.put(`/:id`, async (req, res) => {
  const { id } = req.params;
  const conf = await productManager.updateProduct(id, req.body);
  if (conf) {
    res.status(200).send("Producto actualizado");
  } else {
    res.status(404).send("prodcuto no encontrado.");
  }
});
routerProd.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  const conf = await productManager.deleteProduct(id);
  if (conf) {
    res.status(201).send("Producto eliminado");
  } else {
    res.status(404).send("El producto no encontrado.");
  }
});

export default routerProd;
