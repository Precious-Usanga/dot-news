import { INewsArticle } from "./news.model";


export interface IBookmark {
  title: string;
  description: string;
  url: string;
  bookmark: INewsArticle;
  bookmarkedAt: Date;
}
