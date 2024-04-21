import { Component, Output } from '@angular/core';
import { ChannelDto } from 'src/app/dtos/channel.dto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  
  constructor() {}

  sendChannelDataToChat(data: ChannelDto) {
    console.log('recebi ', data)
  }
}
