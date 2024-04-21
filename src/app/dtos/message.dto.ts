export interface MessageDTO {
  content: string;
  destinataryId: number;
  channelId: number;
  senderId: number;
  sended: boolean;
  received: boolean;
  visualized: boolean;
  excludedFromSender: boolean;
  excludedFromChannel: boolean;
  channeld: number;
}
