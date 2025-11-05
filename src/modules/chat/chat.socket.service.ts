import { MessageModel } from "../../models/message.model";
import { ChatRepository } from "../../repositories/chat.repository";
import { UserRepository } from "../../repositories/user.repository";
import { IAuthenticatedSocket, connectedSockets } from "../../services/gateway";
import { AppError } from "../../utils/AppError";

export class ChatSocketServices {
  private userRepo = new UserRepository();
  private chatRepo = new ChatRepository();

  constructor() {}

  sendMessage = async (
    socket: IAuthenticatedSocket,
    data: { sendTo: string; content: string }
  ) => {
    try {
      const senderId = socket.user?._id as string;

      if (!data.sendTo || !data.content?.trim()) {
        throw new AppError("Receiver ID and message content are required", 400);
      }

      const receiver = await this.userRepo.findById(data.sendTo);
      if (!receiver) throw new AppError("Receiver not found", 404);

      let chat = await this.chatRepo.findPrivateConversation(
        senderId,
        receiver.id
      );
      if (!chat) {
        chat = await this.chatRepo.createPrivateConversation(
          senderId,
          receiver.id
        );
      }

      const message = await MessageModel.create({
        conversation: chat._id,
        sender: senderId,
        content: data.content,
        seenBy: [senderId],
      });

      if (!(chat as any).messages) (chat as any).messages = [];
      (chat as any).messages.push(message._id);
      chat.lastMessage = message._id;
      await chat.save();

      const populatedMessage = await message.populate(
        "sender",
        "firstName lastName profileImage _id"
      );

      socket.emit("messageSent", {
        message: populatedMessage,
        chatId: chat._id,
      });

      const receiverSockets = connectedSockets.get(receiver.id.toString());
      if (receiverSockets?.length) {
        receiverSockets.forEach((sockId) => {
          socket.to(sockId).emit("newMessage", {
            message: populatedMessage,
            chatId: chat._id,
          });
        });
      }

      console.log(
        `Message sent from ${socket.user?.firstName} to ${receiver.firstName}`
      );
    } catch (error: any) {
      console.error("Error sending message:", error.message || error);
      socket.emit("customError", {
        message: error.message || "Failed to send message",
      });
    }
  };

  joinChatRoom = async (
    socket: IAuthenticatedSocket,
    data: { chatId: string }
  ) => {
    try {
      const chat = await this.chatRepo.findOne(
        { _id: data.chatId },
        {
          participants: {
            $in: [socket.user?._id],
          },

          isGroup: true,
        }
      );
      if (!chat) throw new AppError("Chat not found", 404);
      socket.join(chat._id as string);
      console.log(
        `User ${socket.user?.firstName} joined chat room ${chat._id}`
      );
    } catch (error: any) {
      console.error("Error joining chat room:", error.message || error);
      socket.emit("customError", {
        message: error.message || "Failed to join chat room",
      });
    }
  };

  sendGroupMessage = async (
    socket: IAuthenticatedSocket,
    data: { groupId: string; content: string }
  ) => {
    try {
      const senderId = socket.user?._id as string;
      const { groupId, content } = data;

      if (!groupId || !content?.trim()) {
        throw new AppError("Group ID and content are required", 400);
      }

      const groupChat = await this.chatRepo.findOne({
        _id: groupId,
        isGroup: true,
        participants: { $in: [senderId] },
      });

      if (!groupChat)
        throw new AppError("Group not found or access denied", 404);

      const message = await MessageModel.create({
        conversation: groupChat._id,
        sender: senderId,
        content,
        seenBy: [senderId],
      });

      await this.chatRepo.update(groupId, {
        $push: { messages: message._id },
        $set: { lastMessage: message._id, updatedAt: new Date() },
      });

      const populatedMessage = await message.populate(
        "sender",
        "_id firstName lastName profileImage"
      );

      socket.emit("groupMessageSent", {
        groupId,
        message: populatedMessage,
      });

      socket.to(groupId).emit("newGroupMessage", {
        groupId,
        message: populatedMessage,
      });

      console.log(
        `Group message sent in ${groupChat.groupName} by ${socket.user?.firstName}`
      );
    } catch (error: any) {
      console.error("Error sending group message:", error);
      socket.emit("customError", {
        message: error.message || "Failed to send group message",
      });
    }
  };

  joinGroupRoom = async (
    socket: IAuthenticatedSocket,
    data: { groupId: string }
  ) => {
    try {
      const { groupId } = data;
      const senderId = socket.user?._id;

      const groupChat = await this.chatRepo.findOne({
        _id: groupId,
        isGroup: true,
        participants: { $in: [senderId] },
      });

      if (!groupChat)
        throw new AppError("Group not found or access denied", 404);

      socket.join(groupId);
      console.log(
        `${socket.user?.firstName} joined group ${groupChat.groupName}`
      );
    } catch (error: any) {
      console.error("Error joining group room:", error);
      socket.emit("customError", {
        message: error.message || "Failed to join group room",
      });
    }
  };
}
