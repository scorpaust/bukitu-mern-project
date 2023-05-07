import { Book } from "./Book";

export type User = {
  id: string;
  name: string;
  image: string;
  books: Book[];
};
