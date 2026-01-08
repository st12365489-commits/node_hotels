const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  taste: {
    type: String,
    enum: ['sweet', 'spicy', 'sour', 'salty', 'bitter'],
    required: true
  },

  is_drink: {
    type: Boolean,
    default: false
  },

  ingredients: {
    type: [String],
    required: true
  },

  num_sales: {
    type: Number,
    default: 0,
    min: 0
  }
});

const MenuItem = mongoose.model('MenuItem', menuSchema);
module.exports = MenuItem;
