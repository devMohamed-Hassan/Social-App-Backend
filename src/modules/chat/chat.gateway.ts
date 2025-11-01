import { IAuthenticatedSocket } from "../../services/gateway";
import { ChatEvents } from "./chat.event";

export class ChatGateway {
  private chatEvents = new ChatEvents();
  constructor() {}

  sendMessage = (socket: IAuthenticatedSocket) => {
    this.chatEvents.sendMessage(socket);
  };
}
