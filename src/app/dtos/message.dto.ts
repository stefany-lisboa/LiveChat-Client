export interface MessageDTO {
  content: string;
  senderId: number;
  sended: boolean;
  received: boolean;
  visualized: boolean;
  excludedFromSender: boolean;
  excludedFromChannel: boolean;
  channeld: number;
}
