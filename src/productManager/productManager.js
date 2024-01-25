import {promises as fs} from `fs`
import crypto from `crypto`


export class ProductsManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getProducts() {
    const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
    return prods
  }

  async getProductById(id) {
    const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
    const prod =prods.find(product => product.id === id)
    return prod
  }

  async addProduct(prod) {
    const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
    const prodOk =prods.find(product => product.code === code)
    if(prodOk){
      return false
    }else{
      prod.id= crypto.randomBytes(16).toString(`hex`)
      prods.push(prod)
      await fs.writeFile(this.path, JSON.stringify(prods))
      return true
    }
  }

  async updateProduct(id, prod) {
    const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
    const prodOk =prods.find(product => product.id === id)
    if(prodOk){
      prod.title= product.title
    prod.descriptio = product.description
    prod.price = product.price
    prod.stock=product.stock
    prod.thumbnail= product.thumbnail
    prod.code = product.code
    prods.push(prod)
    await fs.writeFile(this.path, JSON.stringify(prods))
    return true
    }else{
      return false
    }
    
  }
  

  async deleteProduct(id) {
    const prods = JSON.parse(await fs.readFile(this.path, `utf-8`))
    const prod =prods.find(product => product.id === id)
    if(prod){
      prods.filter(producto => producto.id !== id)
      await fs.writeFile(this.path, JSON.stringify(prods))
      return true
    }else{
      return false
    }
  }
}



