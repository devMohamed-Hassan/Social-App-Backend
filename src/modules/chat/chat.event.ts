import { ChatSocketServices } from "./chat.socket.service";
import { IAuthenticatedSocket } from "../../services/gateway";

export class ChatEvents {
  private chatSocketServices = new ChatSocketServices();

  registerEvents = (socket: IAuthenticatedSocket) => {
    socket.on("sendMessage", (data) =>
      this.chatSocketServices.sendMessage(socket, data)
    );

    socket.on("sendGroupMessage", (data) =>
      this.chatSocketServices.sendGroupMessage(socket, data)
    );

    socket.on("joinGroup", ({ groupId }) => {
      if (groupId) {
        socket.join(groupId);
        console.log(`${socket.user?.firstName} joined group ${groupId}`);
      }
    });

    socket.on("joinPrivateChat", ({ chatId }) => {
      if (chatId) {
        socket.join(chatId);
        console.log(`${socket.user?.firstName} joined private chat ${chatId}`);
      }
    });

    socket.on("typing", ({ chatId, type }) => {
      const user = socket.user;
      if (!user || !chatId) return;

      socket.to(chatId).emit("userTyping", {
        chatId,
        userName: `${user.firstName}`,
        type,
      });
    });

    socket.on("stopTyping", ({ chatId, type }) => {
      if (!chatId) return;
      socket.to(chatId).emit("userStopTyping", { chatId, type });
    });
  };
}
