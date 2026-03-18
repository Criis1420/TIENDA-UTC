const express = require('express');
const app = express();

app.use(express.json());

// Base de datos en memoria (demo)
let products = [
 { id: 1, name: "Laptop", price: 15000 },
 { id: 2, name: "Mouse", price: 300 }
];

let orders = [];

// =========================
// 📦 PRODUCTOS
// =========================

// Obtener productos
app.get('/products', (req, res) => {
 res.json(products);
});

// Crear producto
app.post('/products', (req, res) => {
 const product = req.body;

 // Validación básica
 if (!product.id || !product.name || !product.price) {
  return res.status(400).json({ error: "Faltan datos del producto" });
 }

 products.push(product);
 res.json(product);
});

// =========================
// 🛒 PEDIDOS
// =========================

// Crear pedido
app.post('/orders', (req, res) => {
 const order = req.body;

 if (!order.items || !Array.isArray(order.items)) {
  return res.status(400).json({ error: "El pedido debe tener items" });
 }

 // calcular total
 let total = 0;

 order.items.forEach(item => {
  const product = products.find(p => p.id === item.id);

  if (product) {
   total += product.price * item.quantity;
  }
 });

 order.total = total;
 orders.push(order);

 res.json(order);
});

// Obtener pedidos
app.get('/orders', (req, res) => {
 res.json(orders);
});

// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`🛒 Tienda corriendo en puerto ${PORT}`);
});