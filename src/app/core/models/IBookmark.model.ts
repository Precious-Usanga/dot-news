import { INewsArticle } from "./news.model";

export interface IAddBookmark {
  title: string;
  description: string;
  url: string;
  bookmark: INewsArticle;
}

export interface IBookmark {
  title: string;
  description: string;
  url: string;
  bookmark: INewsArticle;
}
