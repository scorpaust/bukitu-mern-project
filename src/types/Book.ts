import { User } from "./User";

export type Book = {
  id: string;
  isbn: string;
  title: string;
  summary: string;
  author: string;
  image: string;
  userIds: string[];
};
