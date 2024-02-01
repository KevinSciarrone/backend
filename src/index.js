import express from "express";
import exphbs from "express-handlebars";
import http from "http";
import path from "path";
import WebSocket from "socket.io";
import routerProd from "./routes/product.routes.js";
import routerCart from "./routes/cart.routes.js";


const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = new WebSocket.Server(server);

// Configuración de Handlebars como motor de plantillas
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Establecer la carpeta de vistas
app.set("views", path.join(__dirname, "views"));

// WebSocket - Manejo de conexiones
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (message) => {
    console.log(`Mensaje recibido desde el cliente: ${message}`);
  });

  socket.emit("serverMessage", "¡Conexión establecida con el servidor!");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);

app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { title: "Real Time Products" });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
