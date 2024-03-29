import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  private socket = io('http://localhost:3000');

  ngOnInit(): void {
    this.sendMessage('Hello World');
    this.getReceivedMessage().subscribe({
      next: (message) => {
        console.log('received message', message);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  getReceivedMessage() {
    let observable = new Observable<{ message: String }>((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
