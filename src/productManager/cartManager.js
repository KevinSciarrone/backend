import { promises as fs } from 'fs';
import crypto from 'crypto';

function idRandom() {
    return crypto.randomBytes(8).toString('hex');
}

export class CartManager {
    constructor() {
        this.path = __dirname + "../../../json/carts.json";

        if (!fs.existsSync(this.path)) {
            fs.writeFile(this.path, '[]', { encoding: 'utf-8' });
        }
    }

    async addCart() {
        try {
            const cartId = idRandom();
            const newCart = {
                id: cartId,
                products: []
            };

            const carts = JSON.parse(await fs.readFile("../json/carts.json", { encoding: 'utf-8' }));
            carts.push(newCart);
            await fs.writeFile("../json/carts.json", JSON.stringify(carts, null, 2), { encoding: 'utf-8' });

            return { success: true, cart: newCart };
        } catch (error) {
            console.log(`Error al agregar el carro de compras ${error}`);
        }
    }

    async getCart(cid) {
        const carts = JSON.parse(await fs.readFile("../json/carts.json", { encoding: 'utf-8' }));
        const cart = carts.find(cart => cart.id === cid);

        if (cart) {
            return { success: true, cart: cart.products };
        } else {
            return false;
        }
    }

    async addProductToCart(cid, pid) {
        const quantity = 1;

        const carts = JSON.parse(await fs.readFile("../json/carts.json", { encoding: 'utf-8' }));

        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return { success: false, error: "Carrito no encontrado" };
        }

        const products = JSON.parse(await fs.readFile("../json/products.json", { encoding: 'utf-8' }));

        const productExiste = products.find(product => product.id === pid);

        if (!productExiste) {
            return { success: false, error: "Producto no encontrado en la lista de productos" };
        }

        const productInCart = cart.products.find(product => product.id === pid);

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({
                id: pid,
                quantity: quantity
            });
        }

        await fs.writeFile("../json/carts.json", JSON.stringify(carts, null, 2), { encoding: 'utf-8' });

        return { success: true, cart: cart };
    }
}
