import { Injectable } from '@angular/core';
import { ChatMessageDTO } from '@app/models/chat-message-DTO';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMessages: ChatMessageDTO[];

  constructor() { }

  openWebSocket(): void {
    this.webSocket = new WebSocket('ws://localhost:5000');

    this.webSocket.onopen = (event) => {
      console.log('Opened connection: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDTO = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDTO);
    };

    this.webSocket.onclose = (event) => {
      console.log('Closed connection: ', event);
    };
  }

  sendMessage(chatMessageDTO: ChatMessageDTO): void {
    this.webSocket.send(JSON.stringify(chatMessageDTO));
  }

  closeWebSocket(): void {
    this.webSocket.close();
  }
}
