import {Formateur} from "./formateur.model";
import {Cour} from "./cour.model";
import {Tag} from "./tag.model";

export interface Blog {
  id: string;
  title: string;
  content: string;

  dateCreation: Date;
  imageUrl: string;

  cour: Cour[];
  formateur: Formateur;
  tags: Tag[];
}
