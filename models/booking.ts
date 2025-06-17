import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },

  },
    { timestamps: true }
);

export default model('Booking', BookSchema);