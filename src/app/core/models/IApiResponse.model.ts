export interface IApiResponse<T> {
  articles: Array<T>,
  status: string,
  totalResults: number
}
