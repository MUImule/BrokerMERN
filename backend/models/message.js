const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: String,
    timestamp: { type: Date, default: Date.now },

  },
  {
    indexes: [
      {
        fields: { sender: 1, receiver: 1, content: 1 },
        options: { unique: true },
      },
    ],
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
