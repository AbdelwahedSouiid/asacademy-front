import {Tag} from "./tag.model";
import {Avis} from "./avis.model";
import {Formateur} from "./formateur.model";
import {Categorie} from "./categorie.model";

export interface Video {
  id: string;
  titre: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  vues: number;
  duree: number;
  nbreLike: number;
  nbreDisLike: number;
  dateAjout: string;
  tags: Tag[];
  listAvis: Avis[];
  formateur: Formateur;
  categorie: Categorie;
}
