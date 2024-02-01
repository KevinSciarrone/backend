import { Router } from "express";
import CartManager from "../models/cartManager";

const cartManager = new CartManager();

const routerCart = Router();

routerCart.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart();
    
        if (cart) {
            res.status(201).json({ data: cart.cart });
        } else {
            res.status(500).json({ message: "Error al agregar el carrito" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

routerCart.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCart(cid);
    
        if (cart) {
            res.status(200).send(cart.cart);
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
    
        const result = await cartManager.addProductToCart(cid, pid);
    
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ message: error.error || "Error interno del servidor" });
    }
});

export default routerCart;
