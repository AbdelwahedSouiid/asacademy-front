import {AppUser} from "./user.model";
import {Message} from "./message.model";

export interface Chat {

  id: string;
  chatName: string;
  messages: Message[];
  chatDate: string;
  user: AppUser;

}
