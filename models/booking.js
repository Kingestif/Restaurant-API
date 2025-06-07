const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Booking', BookSchema);