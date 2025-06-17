import { Schema, model } from 'mongoose';

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Drink'],
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Menu = model('Menu', MenuSchema);
export default Menu;
