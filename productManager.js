const fs = require("fs");

class ProductsManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readFromFile() || [];
    this.idGenerator = new IDGenerator();
  }

  readFromFile() {
    try {
      const fileContent = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      return null;
    }
  }

  writeToFile() {
    fs.writeFileSync(
      this.path,
      JSON.stringify(this.products, null, 2),
      "utf-8"
    );
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  addProduct(productData) {
    const newProduct = {
      id: this.idGenerator.generateID(),
      ...productData,
    };
    this.products.push(newProduct);
    this.writeToFile();
    console.log(`El producto ${newProduct.title} fue agregado correctamente.`);
  }

  updateProduct(id, updatedData) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedData, id };
      this.writeToFile();
      console.log(`El producto con ID ${id} fue actualizado correctamente.`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}.`);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeToFile();
      console.log(`El producto con ID ${id} fue eliminado correctamente.`);
    } else {
      console.log(`No existe ningún producto con el ID ${id}.`);
    }
  }
}

class IDGenerator {
  constructor() {
    this.counter = 1;
  }

  generateID() {
    const id = this.counter;
    this.counter += 1;
    return id;
  }
}

const productManager = new ProductsManager("ruta_del_archivo.json");

// Ejemplo de uso
productManager.addProduct({
  title: "Brahma",
  description: "Lata de cerveza Rubia",
  price: 760,
  thumbnail: "ruta",
  code: "ACH001",
  stock: 20,
});

productManager.addProduct({
  title: "Corona",
  description: "Porron cerveza rubia",
  price: 850,
  thumbnail: "ruta",
  code: "ACH002",
  stock: 15,
});

const productId = 1;
const product = productManager.getProductById(productId);
if (product) {
  console.log(`Producto encontrado:`, product);
} else {
  console.log(`No existe ningún producto con el ID ${productId}.`);
}

const updatedData = {
  title: "Nueva Brahma",
  price: 800,
};
productManager.updateProduct(productId, updatedData);

productManager.getProducts().forEach((p) => console.log(p));

const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);

// Verificar que el producto fue eliminado
const deletedProduct = productManager.getProductById(productIdToDelete);
if (deletedProduct === null) {
  console.log(
    `El producto con ID ${productIdToDelete} fue eliminado correctamente.`
  );
} else {
  console.log(`Hubo un problema al intentar eliminar el producto.`);
}

module.exports = ProductsManager;
