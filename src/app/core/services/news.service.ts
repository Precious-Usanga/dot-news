import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Endpoint } from '../shared/endpoints';
import { IApiResponse } from '../models/IApiResponse.model';
import { INewsArticle } from '../models/news.model';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error) {
      return throwError(error.error);
    } else {
      return throwError(error);
    }
  }

  getAllNews(params: { q?: string, sources?: string | string[], sortBy?: string, from?: string, to?: string, pageSize: number, page: number }): Observable<IApiResponse<INewsArticle>>
  {
    return this.http.get<IApiResponse<INewsArticle>>(`${Endpoint.EVERYTHING}`, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getNewsHeadlines(params: { q?: string, sources?: string | string[], category?: string, country?: string, pageSize: number, page: number }): Observable < IApiResponse < INewsArticle >> {
    return this.http.get<IApiResponse<INewsArticle>>(`${Endpoint.TOP_HEADLINES}`, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getNewsHeadlinesBySource(params: { category?: string, country?: string, language?: string, pageSize: number, page: number }): Observable<IApiResponse<INewsArticle>> {
    return this.http.get<IApiResponse<INewsArticle>>(`${Endpoint.SOURCES}`, { params }).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

}


