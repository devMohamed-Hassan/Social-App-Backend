import { MessageModel } from "../../models/message.model";
import { ChatRepository } from "../../repositories/chat.repository";
import { UserRepository } from "../../repositories/user.repository";
import { IAuthenticatedSocket, connectedSockets } from "../../services/gateway";
import { AppError } from "../../utils/AppError";

export class ChatSocketServices {
  private userModel = new UserRepository();
  private chatModel = new ChatRepository();
  constructor() {}

  sendMessage = async (
    socket: IAuthenticatedSocket,
    data: { sendTo: string; content: string }
  ) => {
    try {
      const sender = socket.user?._id as string;

      if (!data.sendTo || !data.content) {
        throw new AppError("Receiver ID and message content are required", 400);
      }

      const receiver = await this.userModel.findById(data.sendTo);
      if (!receiver) {
        throw new AppError("Receiver not found", 404);
      }

      let chat = await this.chatModel.findPrivateConversation(
        sender,
        receiver.id
      );
      if (!chat) {
        chat = await this.chatModel.createPrivateConversation(
          sender,
          receiver.id
        );
      }
      console.log(chat);

      const message = await MessageModel.create({
        conversation: chat._id,
        sender,
        content: data.content,
        seenBy: [sender],
      });

      chat.lastMessage = message._id;
      await chat.save();

      const populatedMessage = await message.populate(
        "sender",
        "firstName lastName profileImage"
      );

      socket.emit("messageSent", { message: populatedMessage });

      const receiverSockets = connectedSockets.get(receiver.id.toString());
      if (receiverSockets?.length) {
        receiverSockets.forEach((sockId) => {
          socket.to(sockId).emit("newMessage", { message: populatedMessage });
        });
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      socket.emit("customError", {
        message: error.message || "Failed to send message",
      });
    }
  };
}
