require('dotenv').config(); // <-- Add this at the very top
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db'); // <-- Import our DB connection
const CartItem = require('./models/CartItem'); // <-- Import our DB model

const app = express();
const PORT = 5000;

// --- Connect to MongoDB ---
connectDB();

app.use(cors());
app.use(express.json());

// --- NO MORE `let cart = []` ---

// --- API Endpoints ---

// 1. GET /api/products (This stays the same)
app.get('/api/products', async (req, res) => {
  console.log("GET /api/products: Fetching from Fake Store API");
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 2. GET /api/cart: Get cart from DATABASE
app.get('/api/cart', async (req, res) => {
  console.log("GET /api/cart: Getting cart from DB");
  try {
    const cartItems = await CartItem.find(); // <-- Get all items from DB
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    });
  } catch (error) {
    console.error("Error getting cart:", error.message);
    res.status(500).json({ message: "Error getting cart" });
  }
});

// 3. POST /api/cart: Add item to DATABASE
app.post('/api/cart', async (req, res) => {
  const { productId, qty } = req.body;
  
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    const product = response.data;
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item is already in DB
    const existingItem = await CartItem.findOne({ productId: productId });

    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save(); // <-- Update item in DB
      console.log(`POST /api/cart: Updated ${product.title} qty.`);
      res.status(200).json(existingItem);
    } else {
      const cartItem = new CartItem({ // <-- Create new DB item
        productId: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: qty
      });
      await cartItem.save(); // <-- Save new item to DB
      console.log(`POST /api/cart: Added ${product.title}.`);
      res.status(201).json(cartItem);
    }
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

// 4. DELETE /api/cart/:id: Remove item from DATABASE
app.delete('/api/cart/:id', async (req, res) => {
  try {
    // Note: The ID is now the MongoDB '_id' string
    const idToRemove = req.params.id; 
    const deletedItem = await CartItem.findByIdAndDelete(idToRemove); // <-- Find by _id and delete
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    console.log(`DELETE /api/cart/:id: Removed item ${idToRemove}.`);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

// 5. POST /api/checkout: Clear cart in DATABASE
app.post('/api/checkout', async (req, res) => {
  const { cartItems, userDetails } = req.body;
  console.log("POST /api/checkout: Processing checkout for", userDetails.name);

  try {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const mockReceipt = {
      receiptId: `VIBE-${Date.now()}`,
      user: userDetails,
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date().toISOString()
    };

    await CartItem.deleteMany({}); // <-- Clear the entire cart in the DB
    
    console.log("Checkout complete, cart cleared from DB.");
    res.json(mockReceipt);

  } catch (error) {
    console.error("Error during checkout:", error.message);
    res.status(500).json({ message: "Error during checkout" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});