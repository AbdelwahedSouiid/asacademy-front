import {Categorie} from "./categorie.model";
import {Inscription} from "./inscription.model";
import {Formateur} from "./formateur.model";

export interface Cour {


  id: string;
  name: string;
  description: string;
  duree: number;
  prix: number;
  video: string;
  affiche: string;
  formateurId: string;
  categorieId: string;
}


/*dateCreation: Date;
inscriptions: Inscription[];
;*/

