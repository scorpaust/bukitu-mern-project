import { User } from './User';

export type Book = {
  id: string;
  title: string;
  summary: string;
  authors: string;
  image: string;
  userIds: string | null[];
};
