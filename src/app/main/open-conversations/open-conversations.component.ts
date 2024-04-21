import { Component, EventEmitter, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ChannelDto } from 'src/app/dtos/channel.dto';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-open-conversations',
  templateUrl: './open-conversations.component.html',
  styleUrls: ['./open-conversations.component.scss'],
})
export class OpenConversationsComponent {
  public channels: ChannelDto[];
  constructor(private channelService: ChannelService) {}

  async ngOnInit() {
    try {
      this.channels = await lastValueFrom(this.channelService.getChannels());
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  }

  sendChannelDataToChat(channel: ChannelDto) {
    this.channelService.setChannel(channel)
  }
}
