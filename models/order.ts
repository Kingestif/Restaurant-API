import { Schema, Types, model } from 'mongoose';

export interface IOrder extends Document {    //type for mongoose document, used to define the structure of the document in MongoDB
  _id: Types.ObjectId;
  customer: Types.ObjectId; 
  totalPrice: number;
  orderStatus: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  items: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema <IOrder>(
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
