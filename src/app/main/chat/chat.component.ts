import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageDTO } from 'src/app/dtos/message.dto';
import { ChatService } from './chat.service';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  private socket = io('http://localhost:3000');
  public messages: MessageDTO[];
  public loggedUser: number;
  public channelId: number;
  public input: FormControl;
  constructor(private chatService: ChatService) {
    this.loggedUser = 1;
    this.channelId = 2;
    this.messages = this.chatService.getMessagesFromChannel(2);
    this.input = new FormControl('');
  }

  ngOnInit(): void {
    this.socket.emit('join', this.channelId);
    this.getReceivedMessage().subscribe({
      next: (message) => {
        console.log('Msg recebida:', message);
      },
      error: (error) => {
        console.log('error', error);
      },
    });

    this.scrollDownChat('instant');
  }

  getReceivedMessage() {
    let observable = new Observable<MessageDTO>((observer) => {
      this.socket.on('message', (data: MessageDTO) => {
        this.messages.push(data);
        this.scrollDownChat();
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getMessagestatus(message: MessageDTO): string {
    if (!message.sended) {
      return 'fa-regular fa-clock';
    }

    if (message.sended && !message.received) {
      return 'fa-solid fa-check';
    }

    if (message.sended && message.received) {
      return message.visualized
        ? 'fa-solid fa-check-double visualized'
        : 'fa-solid fa-check-double';
    }

    if (message.excludedFromChannel || message.excludedFromSender) {
      return '';
    }

    return '';
  }

  sendMessage(event: any) {
    if (event.key == 'Enter' || event.type == 'click') {
      const message: MessageDTO = {
        content: this.input.value,
        senderId: 1,
        sended: false,
        received: false,
        visualized: false,
        excludedFromSender: false,
        excludedFromChannel: false,
        channeld: 2,
      };

      if (this.isInputEmpty()) return;
      this.socket.emit('message', message, this.channelId);
      this.input.reset();
    }
  }

  isInputEmpty(): boolean {
    return this.input.value?.trim().length === 0 ? true: false;
  }

  scrollDownChat(behavior: ScrollBehavior = 'smooth') {
    setTimeout(() => {
      const channelMessages = document.getElementById('channel-messages');
      const height =
        channelMessages?.scrollHeight == undefined
          ? 0
          : channelMessages.scrollHeight;
      if (
        channelMessages &&
        (channelMessages.scrollTop || channelMessages.scrollTop == 0)
      ) {
        channelMessages.scrollTo({
          top: height,
          behavior: behavior,
        });
      }
    }, 100);
  }
}
