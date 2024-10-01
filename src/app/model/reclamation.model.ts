import {AppUser} from "./user.model";

export enum ReclamationStatus {
  RESOLVED = 'RESOLVED',
  NOTRESOLVED = 'NOTRESOLVED'
}

export interface Reclamation {

  id: string;
  sujet: string;
  objet: string;
  status: ReclamationStatus;
  isSpam: boolean;
  user: AppUser;
}
