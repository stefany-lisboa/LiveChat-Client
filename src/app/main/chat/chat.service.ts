import { Injectable } from '@angular/core';
import { MessageDTO } from 'src/app/dtos/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: MessageDTO[] = [];
  constructor() {
    this.fillMessages();
  }

  getMessagesFromChannel(id: number) {
    return this.messages.filter((e) => e.channeld == id);
  }

  fillMessages() {
    this.messages.push(

      {
        content: 'Olá! tudo bem sim, e você?',
        senderId: 2,
        sended: true,
        received: true,
        visualized: true,
        excludedFromSender: false,
        excludedFromChannel: false,
        channeld: 2,
      },
      {
        content: 'Tudo ótimo!',
        senderId: 1,
        sended: true,
        received: true,
        visualized: false,
        excludedFromSender: false,
        excludedFromChannel: false,
        channeld: 2,
      },
    );
  }
}
