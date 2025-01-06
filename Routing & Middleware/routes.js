const express = require('express');
const router = new express.Router();
const items = require('./fakeDb'); // Use the global `items` array for storage

// GET /items - Retrieve all items
router.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new item
router.post('/items', (req, res) => {
  const { name, price } = req.body;

  // Validate inputs
  if (!name || price === undefined || isNaN(price)) {
    return res.status(400).json({ error: "Invalid input. Name and price are required." });
  }

  const newItem = { name, price };
  items.push(newItem); // Add the new item to the global array
  res.status(201).json({ added: newItem });
});

// GET /items/:name - Retrieve a single item by name
router.get('/items/:name', (req, res) => {
  const item = items.find(i => i.name.toLowerCase() === req.params.name.toLowerCase());
  if (!item) return res.status(404).json({ error: "Item not found" });

  res.json(item);
});

// PATCH /items/:name - Update a single item's name or price
router.patch('/items/:name', (req, res) => {
  const item = items.find(i => i.name.toLowerCase() === req.params.name.toLowerCase());
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { name, price } = req.body;

  // Validate inputs
  if (name && typeof name !== "string") {
    return res.status(400).json({ error: "Invalid name." });
  }
  if (price !== undefined && isNaN(price)) {
    return res.status(400).json({ error: "Invalid price." });
  }

  if (name) item.name = name; // Update name if provided
  if (price !== undefined) item.price = price; // Update price if provided

  res.json({ updated: item });
});

// DELETE /items/:name - Delete a single item by name
router.delete('/items/:name', (req, res) => {
  const itemIdx = items.findIndex(i => i.name.toLowerCase() === req.params.name.toLowerCase());
  if (itemIdx === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(itemIdx, 1); // Remove the item from the array
  res.json({ message: "Deleted" });
});

module.exports = router;
