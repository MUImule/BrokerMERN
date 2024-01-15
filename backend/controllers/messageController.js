const Message = require('../models/message');
const ErrorResponse = require('../utils/errorResponse');

exports.sendMessage = async (req, res, next) => {
  try {
    const { sender, receiver, content } = req.body;
    const existingMessage = await Message.findOne({ sender, receiver, content });
    if (existingMessage) {
      return res.status(200).json({ success: true, message: 'Message already sent' });
    }
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).distinct('_id');
    const uniqueMessages = await Message.find({ _id: { $in: messages } });

    res.status(200).json({ success: true, messages: uniqueMessages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
