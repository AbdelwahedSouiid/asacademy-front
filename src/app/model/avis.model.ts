import {AppUser} from "./user.model";
import {Cour} from "./cour.model";

export interface Avis {
  id: string;
  comment: string;
  note: number;
  dateAvis: Date;
  user: AppUser;
  cour: Cour
}
