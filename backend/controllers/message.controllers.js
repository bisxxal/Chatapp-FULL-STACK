import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params; // this id rename to reciveerId
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId,
      message,
      reciverId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }


     await Promise.all([conversation.save (), newMessage.save()]);
     const receiverSocketId = getReceiverSocketId(reciverId);
     if (receiverSocketId) {
       // io.to(<socket_id>).emit() used to send events to specific client
       io.to(receiverSocketId).emit("newMessage", newMessage);
     }
 
    res.status(201).json(newMessage);
    
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in grtMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
