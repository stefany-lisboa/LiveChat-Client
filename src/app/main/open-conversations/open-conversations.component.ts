import { Component } from '@angular/core';

@Component({
  selector: 'app-open-conversations',
  templateUrl: './open-conversations.component.html',
  styleUrls: ['./open-conversations.component.scss'],
})
export class OpenConversationsComponent {
  public channels: any[];

  ngOnInit()  {
    this.channels = [
      {
        id: 1,
        name: 'First',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 1,
        name: 'First',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },

      {
        id: 2,
        name: 'Second',
        message: 'Olá, esta é um mensagem de teste...'
      },
    ];
  }
}
