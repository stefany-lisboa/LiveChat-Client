import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageDTO } from 'src/app/dtos/message.dto';
import { ChatService } from '../../services/chat.service';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ChannelService } from 'src/app/services/channel.service';
import { ChannelDto } from 'src/app/dtos/channel.dto';
import { UserDto } from 'src/app/dtos/user.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  private socket = io('http://localhost:3000');
  public messages: MessageDTO[];
  public loggedUser: number;
  public channel: ChannelDto;
  public users: UserDto[];
  public input: FormControl;
  constructor(private chatService: ChatService, private channelService: ChannelService) {
    this.loggedUser = 1;
    this.input = new FormControl('');
  }

  ngOnInit(): void {
    this.openDirectMessageChannel()
    this.getReceivedMessage().subscribe({
      next: (message) => {
        this.messages.push(message);
        this.scrollDownChat();
      },
      error: (error) => {
        console.log('error', error);
      },
    });

    // this.getUsersFromChannel().subscribe({
    //   next: (users) => {
    //     this.users= users;
    //     console.log('usuários: ', users);
    //   },
    //   error: (error) => {
    //     console.log('error', error);
    //   },
    // });

    this.getMessagesFromChannel().subscribe({
      next: (channel) => {
        this.messages= channel;
        this.scrollDownChat();
        console.log('Msg recebida:', channel);
      },
      error: (error) => {
        console.log('error', error);
      },
    });



    this.scrollDownChat('instant');

  }

  openDirectMessageChannel() {
    this.channelService.selectedChannel$.subscribe((channel) => {      
      this.channel = channel;
      this.socket.emit('join', channel._id);
      this.socket.emit('channel', channel);
      // this.socket.emit('channel/users', channel)
    });
  }


  getReceivedMessage() {
    let observable = new Observable<MessageDTO>((observer) => {
      this.socket.on('message', (data: MessageDTO) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  getMessagesFromChannel() {
    let observable = new Observable<MessageDTO[]>((observer) => {
      this.socket.on('channel', (data: MessageDTO[]) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUsersFromChannel() {
    let observable = new Observable<UserDto[]>((observer) => {
      this.socket.on('channel/users', (data: UserDto[]) => {
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
        destinataryId: 2,
        channelId: 2,        
        senderId: 1,
        sended: false,
        received: false,
        visualized: false,
        excludedFromSender: false,
        excludedFromChannel: false,
        channeld: this.channel._id,
      };

      if (this.isInputEmpty()) return;
      this.socket.emit('message', message, this.channel._id);
      this.input.reset();
    }
  }

  isInputEmpty(): boolean {
    return this.input.value == null || this.input.value?.trim().length === 0 ? true: false;
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
