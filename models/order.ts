import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Menu',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export default model('Order', OrderSchema);
