import {AppUser} from "./user.model";
import {Cour} from "./cour.model";

export interface Inscription {
  id?: string;
  statut?: string;
  progress?: number;
  dateInscription?: Date;
  user: AppUser;
  cour: Cour;
}
