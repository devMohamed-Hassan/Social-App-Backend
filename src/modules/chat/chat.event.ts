import { ChatSocketServices } from "./chat.socket.service";
import { IAuthenticatedSocket } from "../../services/gateway";

export class ChatEvents {
  private chatSocketServices = new ChatSocketServices();
  constructor() {}

  sendMessage = async (socket: IAuthenticatedSocket) => {
    socket.on("sendMessage", (data) => {
      return this.chatSocketServices.sendMessage(socket, data);
    });
  };
}
