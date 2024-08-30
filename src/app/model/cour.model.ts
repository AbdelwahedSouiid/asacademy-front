import {Categorie} from "./categorie.model";
import {Inscription} from "./inscription.model";
import {Formateur} from "./formateur.model";
import {Avis} from "./avis.model";
import {Tag} from "./tag.model";

export interface Cour {


  id: string;
  name: string;
  description: string;
  duree: number;
  prix: number;
  video: string;
  affiche: string;
  dateCreation: string;
  paiement: string;
  formateur: Formateur;
  categorie: Categorie;
  avis: Avis[];
  tags: Tag[];
  inscriptions: Inscription[];

}


