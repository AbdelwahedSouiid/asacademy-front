import {Categorie} from "./categorie.model";
import {Inscription} from "./inscription.model";
import {Formateur} from "./formateur.model";

export interface Cour {
  name: string;
  description: string;
  duree: number;
  prix: number;
  video: string;

  /*dateCreation: Date;

  categorie: Categorie;
  inscriptions: Inscription[];
  formateur: Formateur;*/

}
