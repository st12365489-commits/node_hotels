const express = require('express');
const router = express.Router();

const MenuItem = require( '../models/Menu');

//POST route to create a new menu item
router.get('/', (req, res) => {
  res.send('Hello World!')
})

//post method for menu
router.post('/menu', async (req, res) => {
  try {
    const data = req.body; 
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log('Menu item saved successfully:', savedMenuItem);
    res.status(201).json(savedMenuItem);
  }
    catch (err) {
    console.error('Error saving menu item:', err);
    res.status(500).json({ error: 'Error saving menu item' });
  }
});
//get method for menu
router.get('/menu', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('Menu items retrieved successfully:', data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error retrieving menu items:', err);
    res.status(500).json({ error: 'Error retrieving menu items' });
  }
});


// GET menu by taste
router.get('/menu/taste/:tasteType', async (req, res) => {
  try {
    const { tasteType } = req.params;

    const items = await MenuItem.find({ taste: tasteType });

    if (items.length === 0) {
      return res.status(404).json({
        message: `No menu items with taste: ${tasteType}`
      });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching menu by taste' });
  }
});

module.exports = router;
